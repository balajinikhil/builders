const Router = require("express").Router();
const viewController = require("./../controller/viewController");

Router.get("/", viewController.homePage);
Router.get("/architectural-work", viewController.arcPage);
Router.get("/structure-work", viewController.structurePage);
Router.get("/interior-work", viewController.interiorPage);

module.exports = Router;
