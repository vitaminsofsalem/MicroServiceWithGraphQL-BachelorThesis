import waitOn from 'wait-on';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { introspectSchema } from '@graphql-tools/wrap';
import { stitchSchemas } from '@graphql-tools/stitch';
import makeRemoteExecutor from './lib/make_remote_executor.js'; 
// import localSchema from './services/orders/schema.js';

async function makeGatewaySchema() {
  // Make remote executors:
  // these are simple functions that query a remote GraphQL API for JSON.
  const productsExec = makeRemoteExecutor('http://localhost:4001/graphql');
  const ordersExec = makeRemoteExecutor('http://localhost:4002/graphql');
  const usersExec = makeRemoteExecutor('http://localhost:4003/graphql');
  const adminContext = { authHeader: 'Bearer my-app-to-app-token' };

  return stitchSchemas({
    subschemas: [
      {
        schema: await introspectSchema(productsExec, adminContext),
        executor: productsExec,
      },
      {
        schema: await introspectSchema(ordersExec, adminContext),
        executor: ordersExec,
        merge: {
          User: {
            fieldName: '_user',
            selectionSet: '{ id }',
            args: ({ id }) => ({ id }),
          },
          Order: {
            fieldName: 'order',
            selectionSet: '{ id }',
            args: ({ id }) => ({ id: id }),
          }
        }
      },
      {
        schema: await introspectSchema(usersExec, adminContext),
        executor: usersExec,
        merge: {
          User: {
            fieldName: 'user',
            selectionSet: '{ id }',
            args: ({ id }) => ({ id }),
          }
        }
      }
    ],
  });
}

waitOn({ resources: ['tcp:4001', 'tcp:4002', 'tcp:4003'] }, async () => {
  const schema = await makeGatewaySchema();
  const app = express();
  app.use('/graphql', graphqlHTTP((req) => ({
    schema,
    context: { authHeader: req.headers.authorization },
    graphiql: true
  })));
  app.listen(4000, () => console.log('gateway running at http://localhost:4000/graphql'));
});
