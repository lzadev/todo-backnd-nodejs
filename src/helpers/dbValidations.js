const Todo = require("../models/todo");
const existsTodo = async (id) => {
  const todo = await Todo.findOne({ _id: id });

  if (!todo) {
    throw new Error(`The todo with id ${id} does not exist`);
  }
};

module.exports = existsTodo;
