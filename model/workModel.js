const mongoose = require("mongoose");
const slugify = require("slugify");

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "work must have title"],
  },
  description: {
    type: String,
    required: [true, "work must have description"],
  },
  slug: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

workSchema.pre("save", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  });

  this.image = slugify(this.title, {
    lower: true,
  });

  next();
});

const workModel = mongoose.model("works", workSchema);

module.exports = workModel;
