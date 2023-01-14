import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';

const app = express();
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(4001, () => console.log('orders running at http://localhost:4002/graphql'));
