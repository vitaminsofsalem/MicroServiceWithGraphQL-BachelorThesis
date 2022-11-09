import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';

const app = express();
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(4003, () => console.log('products running at http://localhost:4003/graphql'));
