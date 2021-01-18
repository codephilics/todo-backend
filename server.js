const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const port = process.env.PORT;
const mongouri = process.env.MONGODB_URI;

mongoose.connect(
  mongouri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) return console.log(err);
    app.listen(port, function () {
      console.log(`successfully server started on port ${port}`);
    });
  }
);
