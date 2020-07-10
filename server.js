process.on("uncaughtException", (err) => {
  console.log(err.message);
  process.exit(1);
});

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

console.log(`NODE_ENV:`, process.env.NODE_ENV);

const DB = process.env.DB;

const mongoose = require("mongoose");
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((err) => {
    console.log(err);
  });

const app = require("./app");
const PORT = process.env.PORT || 6600;

const server = app.listen(PORT, () => {
  console.log(`server up and running ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
