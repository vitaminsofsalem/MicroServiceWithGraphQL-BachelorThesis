import { v4 as uuidv4 } from "uuid";

export const Mutation = {
  addProduct: async (_, args, context) => {
    const doesProductExist = await context.db
      .collection("products")
      .findOne({ name: args.input.name });

    if (doesProductExist) {
      return doesProductExist;
    }

    const { insertedId } = await context.db.collection("products").insertOne({
      _id: uuidv4(),
      ...args.input,
    });

    return await context.db.collection("products").findOne({ _id: insertedId });
  },
  updateProduct: async (_, args, context) => {
    const { value } = await context.db
      .collection("products")
      .findOneAndUpdate(
        { _id: args.id },
        { $set: args.input },
        { returnDocument: "after" }
      );

    return value;
  },
  deleteProduct: async (_, args, context) => {
    const { deletedCount } = await context.db
      .collection("products")
      .deleteOne({ _id: args.id });

    return deletedCount === 1;
  },
  addCategory: async (_, args, context) => {
    const doesCategoryExist = await context.db
      .collection("categories")
      .findOne({ name: args.input.name });

    if (doesCategoryExist) {
      return doesCategoryExist;
    }

    const { insertedId } = await context.db.collection("categories").insertOne({
      _id: uuidv4(),
      ...args.input,
    });

    return await context.db
      .collection("categories")
      .findOne({ _id: insertedId });
  },
  updateCategory: async (_, args, context) => {
    const { value } = await context.db
      .collection("categories")
      .findOneAndUpdate(
        { _id: args.id },
        { $set: args.input },
        { returnDocument: "after" }
      );

    return value;
  },
  deleteCategory: async (_, args, context) => {
    const { deletedCount } = await context.db
      .collection("categories")
      .deleteOne({ _id: args.id });

    return deletedCount === 1;
  },
};
