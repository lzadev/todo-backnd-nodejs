const { model, Schema } = require("mongoose");

const TodoSchema = Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
  },
  createAt: {
    type: Date,
    default: new Date().getDate(),
  },
  completeBy: {
    type: Date,
    required: [true, "completeBy is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

TodoSchema.methods.toJSON = function () {
  const { _id, __v, createAt, ...todo } = this.toObject();
  todo.id = _id;

  return todo;
};

module.exports = model("todo", TodoSchema);
