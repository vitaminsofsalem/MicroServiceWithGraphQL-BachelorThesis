import { makeExecutableSchema } from '@graphql-tools/schema';
import NotFoundError from '../../lib/not_found_error.js';
import readFileSync from '../../lib/read_file_sync.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefs = readFileSync(__dirname, 'schema.graphql');

// data fixtures
const users = [
  { id: '1', name: 'Killer Molly', age: 15, gender: 'FEMALE' },
  { id: '2', name: 'Freddy Kruger', age: 3, gender: 'MALE' },
  { id: '3', name: 'Micheal Myers', age: 3, gender: 'MALE' },
];

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      user: (root, { id }) => users.find(u => u.id === id) || new NotFoundError(),
      users: (root) => users
    }
  }
});
