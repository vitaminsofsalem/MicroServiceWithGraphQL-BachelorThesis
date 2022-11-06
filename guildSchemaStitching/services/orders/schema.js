import { makeExecutableSchema } from '@graphql-tools/schema';
import readFileSync from '../../lib/read_file_sync.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefs = readFileSync(__dirname, 'schema.graphql');

// data fixtures
const orders = [
    { id: '1', orderStatus: 'PENDING' },
    { id: '2', orderStatus: 'APPROVED' },
    { id: '3', orderStatus: 'REJECTED' },
  ];

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
        order: (root, { id }) => orders.find(o => o.id === id) || new NotFoundError()
    }
}
});
