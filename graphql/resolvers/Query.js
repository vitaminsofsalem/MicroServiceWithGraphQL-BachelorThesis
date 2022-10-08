export const Query = {
  hello: (parent, args, context) => "World",
  product: async (parent, args, context) => {
    const test = await context.db.collection("products").find({}).toArray();
    console.log(test[0]);
    return test[0];
  },
};
