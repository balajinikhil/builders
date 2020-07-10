const path = require("path");
const Router = require("express").Router();
const multer = require("multer");
const adminController = require("./../controller/adminController");
const fileUpload = require("./../controller/fileUpload");

Router.get("/login", adminController.login);
Router.post("/login", adminController.authLogin);

// Router.route("/signup").post(adminController.signup);

// Router.get("/", adminController.protect, adminController.getAllUsers);

Router.use(adminController.protect);

Router.get("/dashboard", adminController.protect, adminController.dashboard);

Router.route("/team")
  .get(adminController.protect, adminController.getAllTeam)
  .post(adminController.protect, adminController.addTeam);

// team img upload middleware

const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const Storage = multer.diskStorage({
  destination: "./public/uploads/team/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 2000000 },
  //   fileFilter: function (req, file, cb) {
  //     checkFileType(file, cb);
  //   },
}).single("img");

Router.route("/admin-details").get(adminController.adminSignup);
Router.route("/admin-team")
  .get(adminController.adminTeam)
  .post(upload, adminController.addTeam);

Router.get("/admin-contact", adminController.getContact);

Router.get("/admin-team/:slug", adminController.deleteTeam);
Router.get("/admin-contact/:slug", adminController.deleteContact);

const arcStorage = multer.diskStorage({
  destination: "./public/images/arcWork",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const arcUpload = multer({
  storage: arcStorage,
  //   limits: { fileSize: 2000000 },
}).single("arc");

Router.route("/admin-arc")
  .get(adminController.addArc)
  .post(arcUpload, adminController.addArcImg);

Router.get("/admin-arc/:slug", adminController.delArc);

Router.route("/admin-strc")
  .get(adminController.getStrc)
  .post(fileUpload.addStrImg, adminController.addStrc);

Router.get("/admin-strc/:slug", adminController.delStr);

Router.route("/admin-intr")
  .get(adminController.getIntr)
  .post(fileUpload.addIntrImg, adminController.addIntr);

Router.get("/admin-intr/:slug", adminController.delIntr);

module.exports = Router;
