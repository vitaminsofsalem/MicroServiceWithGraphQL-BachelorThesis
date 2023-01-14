import { makeExecutableSchema } from '@graphql-tools/schema';
import readFileSync from '../../lib/read_file_sync.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefs = readFileSync(__dirname, 'schema.graphql');

// data fixtures
const orders = [
    { id: '1', orderStatus: 'PENDING', userId: '1' },
    { id: '2', orderStatus: 'APPROVED', userId: '2' },
    { id: '3', orderStatus: 'REJECTED', userId: '1' },
];

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
        order: (root, { id }) => orders.find(o => o.id === id) || new NotFoundError(),
        orders: (root) => orders,
        _user: (root, { id }) => ({ id, orders: orders.filter(o => o.userId === id) }),
    },
    Order: {
      user: (order) => ({ id: order.userId }),
    },
    User: {
      orders: (user) => orders.filter(o => o.userId === user.id),
    }
}
});
