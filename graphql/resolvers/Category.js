export const Category = {
  products: (parent, args, context) => {
    return context.db
      .collection("products")
      .find({ categoryId: parent._id })
      .toArray();
  },
};
