module.exports = (err, req, res, next) => {
  if ((process.env.NODE_ENV = "development")) console.log(err);

  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
  //   res.status(err.statusCode).render("error", {
  //     title: "error",
  //   });
};
