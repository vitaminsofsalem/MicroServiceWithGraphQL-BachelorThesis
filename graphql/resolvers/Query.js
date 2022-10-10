export const Query = {
  product: async (parent, args, context) => {
    return await context.db.collection("products").findOne({ _id: args.id });
  },
  products: async (parent, args, context) => {
    return await context.db.collection("products").find({}).toArray();
  },
  category: async (parent, args, context) => {
    return await context.db
      .collection("categories")
      .findOne({ _id: args.id })
  },
  categories: async (parent, args, context) => {
    return await context.db.collection("categories").find({}).toArray();
  },
};
