const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controller/errorHandler");
const AppError = require("./utils/appError");
const viewRouter = require("./routes/viewRoutes");
const adminRouter = require("./routes/adminRoutes");
const clientRouter = require("./routes/clientRoutes");

const app = express();

//pug setup
app.set("view engine", "pug");
app.set("views", [
  path.join(__dirname, "/views"),
  path.join(__dirname, "/views/admin"),
  path.join(__dirname, "/views/workDetails"),
]);

// public
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// request logs
if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

// Routing
app.use("/", viewRouter);

app.use("/admin", adminRouter);

app.use("/contact", clientRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
