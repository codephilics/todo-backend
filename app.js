const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

const todoRouter = require("./todos/route");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/todos", todoRouter);

app.use((req, res, next) => {
  res.status(404).json({ status: 404, message: "404 not found" });
});

module.exports = app;
