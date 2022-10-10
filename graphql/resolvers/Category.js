export const Category = {
  products: async (parent, args, context) => {
    return await context.db
      .collection("products")
      .find({ categoryId: parent._id })
      .toArray();
  },
};
