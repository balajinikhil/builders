const mongoose = require("mongoose");
const slugify = require("slugify");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "missing",
  },
  email: {
    type: String,
    default: "missing",
  },
  subject: {
    type: String,
    default: "missing",
  },
  message: {
    type: String,
    default: "missing",
  },
  slug: {
    type: String,
  },
});

clientSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const clientModel = mongoose.model("client", clientSchema);

module.exports = clientModel;
