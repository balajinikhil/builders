const catchAsync = require("./../utils/catchAsync");
const Team = require("./../model/teamModel");

const Arc = require("./../model/arcModel");
const Interior = require("./../model/interiorModel");
const Structure = require("./../model/structureModel");

exports.homePage = catchAsync(async (req, res, next) => {
  const team = await Team.find();

  res.status(200).render("base", {
    title: "",
    team,
  });
});

exports.arcPage = catchAsync(async (req, res, next) => {
  const arc = await Arc.find();
  res.status(200).render("detail_architec", {
    title: "Architectural works",
    arc,
  });
});

exports.interiorPage = catchAsync(async (req, res, next) => {
  const interiors = await Interior.find();

  res.status(200).render("detail_interior", {
    title: "Interior works",
  });
});

exports.structurePage = catchAsync(async (req, res, next) => {
  const structures = await Structure.find();

  res.status(200).render("detail_structure", {
    title: "Strcture works",
  });
});
