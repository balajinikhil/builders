const Router = require("express").Router();
const clientController = require("../controller/clientController");

Router.route("/").post(clientController.contactUs);

module.exports = Router;
