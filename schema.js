import { gql } from "apollo-server";


export const typeDefs = gql`
type Query {
  hello: String
  product(id: ID!): Product
  categories: [Category!]!
  category(id: ID!): Category
}

type Mutation {
  addCategory(input: AddCategoryInput!): Category!
  addProduct(input: AddProductInput!): Product!
  deleteCategory(id: ID!): Boolean!
  deleteProduct(id: ID!): Boolean!
  updateCategory(id: ID!, input: UpdateCategoryInput!): Category
  updateProduct(id: ID!, input: UpdateProductInput!): Product
}

type Product {
  _id: ID!
  name: String!
  description: String!
  quantity: Int!
  image: String!
  price: Float!
  onSale: Boolean!
  category: Category
}

type Category {
  _id: ID!
  name: String!
  products: [Product!]!
}

input AddCategoryInput {
  name: String!
}

input UpdateCategoryInput {
  name: String!
}

input AddProductInput {
  name: String!
  description: String!
  quantity: Int!
  image: String!
  price: Float!
  onSale: Boolean!
  categoryId: String
}

input UpdateProductInput {
  name: String!
  description: String!
  quantity: Int!
  image: String!
  price: Float!
  onSale: Boolean!
  categoryId: String
}

`;