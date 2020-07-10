const { promisify } = require("util");

const fs = require("fs");

const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Team = require("./../model/teamModel");
const Arc = require("./../model/arcModel");
const Contact = require("./../model/clientModel");
const Interior = require("./../model/interiorModel");
const Structure = require("./../model/structureModel");

//CREATE JWT TOKEN
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SCERET, {
    expiresIn: "90d",
  });
};

const cookieOptions = {
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login");
});

//ADMIN LOGIN
exports.authLogin = catchAsync(async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  const data = await User.findOne({ username: username });

  if (
    username == data.username &&
    (await data.passwordCheck(data.password, password))
  ) {
    const token = await createToken(data._id);
    res.cookie("jireh", token, cookieOptions);
    res.status(200).json({
      status: "success",
      data,
    });
  } else {
    next(new AppError("Unauthorised", 500));
  }
});

//ADD ADMIN
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: "success",
    user,
  });
});

//GET ALL ADMIN
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

// PASSWORD PROTECT
exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jireh;
  if (!token) {
    next(new AppError("please login again", 401));
  }

  const jwtPromise = promisify(jwt.verify);
  let decoded = await jwtPromise(token, process.env.JWT_SCERET);

  const user = await User.findById(decoded.id);

  if (!user) {
    next(new AppError("user dosenot exists anymore login again", 402));
  }
  req.user = user;
  res.locals.user = user;
  next();
});

//DASHBOARD REDIRECT
exports.dashboard = catchAsync(async (req, res, next) => {
  res.status(200).redirect("/admin/admin-details");
});

//GET ALL TEAM
exports.getAllTeam = catchAsync(async (req, res, next) => {
  const team = await Team.find();

  res.status(200).json({
    status: "success",
    team,
  });
});

//ADMIN DETAILS
exports.adminSignup = catchAsync(async (req, res, next) => {
  const admin = await User.find();
  const team = await Team.find();
  const clients = await Contact.find();

  res.status(200).render("admin_details", {
    title: "Admin Details",
    teamlen: team.length,
    admin,
    adminnme: admin[0].username,
    adminlen: admin.length,
    contactlen: clients.length,
  });
});

//GET ARC DETAILS
exports.addArc = catchAsync(async (req, res, next) => {
  const team = await Team.find();
  const admin = await User.find();
  const clients = await Contact.find();

  const arc = await Arc.find();

  res.status(200).render("admin_addArc", {
    title: "Add Img",
    team,
    teamlen: team.length,
    adminnme: admin[0].username,
    adminlen: admin.length,
    contactlen: clients.length,
    arc,
  });
});

//ADD TEAM MEMBERS
exports.addTeam = catchAsync(async (req, res, next) => {
  let obj = {
    name: req.body.name,
    description: req.body.description,
    img: req.file.originalname,
  };

  const newTeam = await Team.create(obj);
  const admin = await User.find();
  const team = await Team.find();
  const clients = await Contact.find();

  res.status(201).render("admin_team", {
    title: "Team Details",
    team,
    teamlen: team.length,
    adminnme: admin[0].username,
    adminlen: admin.length,
  });
});

//GET TEAM MEMBERS
exports.adminTeam = catchAsync(async (req, res, next) => {
  const team = await Team.find();
  const admin = await User.find();
  const clients = await Contact.find();

  res.status(200).render("admin_team", {
    title: "Team Details",
    team,
    teamlen: team.length,
    adminnme: admin[0].username,
    adminlen: admin.length,
    contactlen: clients.length,
  });
});

//DELETE TEAM MEMBERS
exports.deleteTeam = catchAsync(async (req, res, next) => {
  const imgName = await Team.findOne({ slug: req.params.slug });
  const imgPath = imgName.img;
  await fs.unlinkSync(`./public/uploads/team/${imgPath}`);

  const team = await Team.deleteOne({ slug: req.params.slug });

  res.status(200).redirect("/admin/admin-team");
});

//GET CONTACT DETAILS
exports.getContact = catchAsync(async (req, res, next) => {
  const team = await Team.find();
  const admin = await User.find();

  const clients = await Contact.find();

  res.status(200).render("admin_contact", {
    title: "Contact Details",
    contacts: clients,
    teamlen: team.length,
    adminnme: admin[0].username,
    adminlen: admin.length,
    contactlen: clients.length,
  });
});

//DELETE CONTACT DETAILS
exports.deleteContact = catchAsync(async (req, res, next) => {
  let slug = req.params.slug;

  await Contact.deleteOne({ slug: slug });

  res.status(200).redirect("/admin/admin-contact");
});

//POST ARC WORKS
exports.addArcImg = catchAsync(async (req, res, next) => {
  let obj = {
    heading: req.body.heading,
    description: req.body.description,
    img: req.file.filename,
  };

  const arc = await Arc.create(obj);

  res.status(201).redirect("/admin/admin-arc");
});

//GET STR WORKS
exports.addStrc = catchAsync(async (req, res, next) => {
  let obj = {
    heading: req.body.heading,
    description: req.body.description,
    img: req.file.filename,
  };
  const structure = await Structure.create(obj);
  res.status(201).redirect("/admin/admin-strc");
});

//ADD INTERIOR WORKS
exports.addIntr = catchAsync(async (req, res, next) => {
  let obj = {
    heading: req.body.heading,
    description: req.body.description,
    img: req.file.filename,
  };

  const intr = await Interior.create(obj);

  res.status(201).redirect("/admin/admin-intr");
});

//GET STRUCTURE WORKS
exports.getStrc = catchAsync(async (req, res, next) => {
  const team = await Team.find();
  const admin = await User.find();
  const clients = await Contact.find();

  const structure = await Structure.find();

  res.status(200).render("admin_addStrc", {
    title: "Add Img",
    team,
    teamlen: team.length,
    adminnme: admin[0].username,
    adminlen: admin.length,
    contactlen: clients.length,
    structure,
  });
});

//GET  INTERIOR WORKS
exports.getIntr = catchAsync(async (req, res, next) => {
  const team = await Team.find();
  const admin = await User.find();
  const clients = await Contact.find();
  const interiors = await Interior.find();

  res.status(200).render("admin_addIntr", {
    title: "Add Img",
    team,
    teamlen: team.length,
    adminnme: admin[0].username,
    adminlen: admin.length,
    contactlen: clients.length,
    interiors,
  });
});

exports.delArc = catchAsync(async (req, res, next) => {
  const imgName = await Arc.findOne({ slug: req.params.slug });
  const imgPath = imgName.img;
  await fs.unlinkSync(`./public/images/arcWork/${imgPath}`);

  const team = await Arc.deleteOne({ slug: req.params.slug });

  res.status(200).redirect("/admin/admin-arc");
});

exports.delIntr = catchAsync(async (req, res, next) => {
  req.params;
  const imgName = await Interior.findOne({ slug: req.params.slug });
  const imgPath = imgName.img;
  await fs.unlinkSync(`./public/images/interiors/${imgPath}`);

  const team = await Arc.deleteOne({ slug: req.params.slug });

  res.status(200).redirect("/admin/admin-arc");
});

exports.delStr = catchAsync(async (req, res, next) => {
  const imgName = await Structure.findOne({ slug: req.params.slug });
  const imgPath = imgName.img;
  await fs.unlinkSync(`./public/images/structures/${imgPath}`);

  const team = await Arc.deleteOne({ slug: req.params.slug });

  res.status(200).redirect("/admin/admin-arc");
});
