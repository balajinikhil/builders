const catchAsync = require("../utils/catchAsync");
const Client = require("./../model/clientModel");
const sendMail = require("../utils/sendMail");

exports.contactUs = catchAsync(async (req, res, next) => {
  const client = await Client.create(req.body);

  let options = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };

  await sendMail(options);

  res.status(200).json({
    status: "success",
    client,
  });
});
