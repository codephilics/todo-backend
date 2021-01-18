const express = require("express");
const router = express.Router();
const Todo = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find({}).sort("-createdAt");
    res.status(200).json({ status: 200, total: todos.length, todos });
  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { text, complate } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ status: 400, message: "please provide todo text" });
    }

    const todo = new Todo({ text, complate });
    const saveTodo = await todo.save();
    res.status(201).json({ status: 201, todo: saveTodo });
  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error" });
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: 200, todo });
  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error" });
  }
});

module.exports = router;
