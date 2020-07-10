const multer = require("multer");

const arcStorage = multer.diskStorage({
  destination: "./public/uploads/arcWork",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.addArcImg = multer({
  storage: arcStorage,
  limits: {
    fileSize: 2000000,
  },
}).single("arc");

const strStorage = multer.diskStorage({
  destination: "./public/images/structures",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.addStrImg = multer({
  storage: strStorage,
  limits: {
    fileSize: 2000000,
  },
}).single("str");

const intStorage = multer.diskStorage({
  destination: "./public/images/interiors",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.addIntrImg = multer({
  storage: intStorage,
  limits: {
    fileSize: 2000000,
  },
}).single("intr");
