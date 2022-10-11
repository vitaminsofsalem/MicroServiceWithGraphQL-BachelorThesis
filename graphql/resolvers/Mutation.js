import { v4 as uuidv4 } from "uuid";

async function add(db, dataObject) {
  // Currently using <findOneAndUpdate> instead of <insertOne> in order to return the new document.
  // This used to be possible in MongoDB 3.X, but is no longer possible in MongoDB 4.X hence this workaround.
  const { value } = await db.findOneAndUpdate(
    {
      _id: uuidv4(),
    },
    {
      $setOnInsert: dataObject,
    },
    {
      upsert: true,
      returnDocument: "after",
    }
  );

  return value;
}

async function update(db, id, dataObject) {
  return await db.findOneAndUpdate(
    { _id: id },
    { $set: dataObject },
    { returnDocument: "after" }
  );
}

async function remove(db, id) {
  return await db.deleteOne({ _id: id });
}

export const Mutation = {
  addProduct: async (_, args, context) => {
    const doesProductExist = await context.db
      .collection("products")
      .findOne({ name: args.input.name });

    if (doesProductExist) {
      return doesProductExist;
    }

    return await add(context.db.collection("products"), args.input);
  },
  updateProduct: async (_, args, context) => {
    const { value } = await update(
      context.db.collection("products"),
      args.id,
      args.input
    );

    return value;
  },
  deleteProduct: async (_, args, context) => {
    const { deletedCount } = await remove(context.db.collection("products"), args.id);

    return deletedCount === 1;
  },
  addCategory: async (_, args, context) => {
    const doesCategoryExist = await context.db
      .collection("categories")
      .findOne({ name: args.input.name });

    if (doesCategoryExist) {
      return doesCategoryExist;
    }

    return await add(context.db.collection("categories"), args.input);
  },
  updateCategory: async (_, args, context) => {
    const { value } = await update(
      context.db.collection("categories"),
      args.id,
      args.input
    );

    return value;
  },
  deleteCategory: async (_, args, context) => {
    const { deletedCount } = await remove(
      context.db.collection("categories"),
      args.id
    );

    return deletedCount === 1;
  },
};
