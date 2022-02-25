const { response } = require("express");
const { request } = require("express");
const Todo = require("../models/todo");
const { internalError } = require("../helpers/commonReponse");

const getAllTodo = async (req = request, res = response) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({ total: todos.length, todos });
  } catch (error) {
    console.log(error);
    internalError(res);
  }
};

const getTodoById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ _id: id });
    res.status(200).json({ todo });
  } catch (error) {
    console.log(error);
    internalError(res);
  }
};

const createTodo = async (req = request, res = response) => {
  try {
    const { title, description, completeBy } = req.body;
    const newTodo = new Todo({
      title,
      description,
      completeBy,
    });

    await newTodo.save();
    res.json({ todo: newTodo });
  } catch (error) {
    console.log(error);
    internalError(res);
  }
};

const deleteTodo = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    await Todo.findOneAndDelete({ _id: id });
    res.status(200).json({ msg: "The todo was deleted successful" });
  } catch (error) {
    console.log(error);
    internalError(res);
  }
};

const updateTodo = async (req = request, res = response) => {
  try {
    const { _id, createAt, ...todo } = req.body;
    const id = req.params.id;
    const todoUpdated = await Todo.findOneAndUpdate({ _id: id }, todo);
    res.json({ todo: todoUpdated });
  } catch (error) {
    console.log(error);
    internalError(res);
  }
};

module.exports = {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
