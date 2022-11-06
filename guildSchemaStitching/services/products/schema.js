import { makeExecutableSchema } from '@graphql-tools/schema';
import NotFoundError from '../../lib/not_found_error.js';
import readFileSync from '../../lib/read_file_sync.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefs = readFileSync(__dirname, 'schema.graphql');

// data fixtures
const products = [
  { upc: '1', name: 'Cookbook', price: 15.99 },
  { upc: '2', name: 'Toothbrush', price: 3.99 },
];

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      product: (root, { upc }) => products.find(p => p.upc === upc) || new NotFoundError()
    }
  }
});
