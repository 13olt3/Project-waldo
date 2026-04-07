require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

const PORT = 3030;

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`express port ${PORT}`);
});
