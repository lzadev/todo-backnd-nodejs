const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");
const existsTodo = require("../helpers/dbValidations");
const checkValidations = require("../middlewares/checkValidations");

router.get("/", getAllTodo);
router.get(
  "/:id",
  [
    check("id", "You must provide a valid id").isMongoId(),
    check("id").custom(existsTodo),
    checkValidations,
  ],
  getTodoById
);
router.post(
  "/",
  [
    check("title", "The title is required").not().isEmpty(),
    check("completeBy", "The completeBy is required").not().isEmpty(),
    checkValidations,
  ],
  createTodo
);
router.put(
  "/:id",
  [
    check("id", "You must provide a valid id").isMongoId(),
    check("id").custom(existsTodo),
    check("title", "The title is required").not().isEmpty(),
    check("completeBy", "The completeBy is required").not().isEmpty(),
    checkValidations,
  ],
  updateTodo
);
router.delete(
  "/:id",
  [
    check("id", "You must provide a valid id").isMongoId(),
    check("id").custom(existsTodo),
    checkValidations,
  ],
  deleteTodo
);

module.exports = router;
