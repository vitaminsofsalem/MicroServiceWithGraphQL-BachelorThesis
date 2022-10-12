export const Query = {
  product: (parent, args, context) => {
    return context.db.collection("products").findOne({ _id: args.id });
  },
  products: (parent, args, context) => {
    return context.db.collection("products").find({}).toArray();
  },
  category: (parent, args, context) => {
    return context.db
      .collection("categories")
      .findOne({ _id: args.id })
  },
  categories: (parent, args, context) => {
    return context.db.collection("categories").find({}).toArray();
  },
};
