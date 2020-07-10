const mongoose = require("mongoose");
const slugify = require("slugify");

const interiorSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, "interior must have heading"],
  },
  img: {
    type: String,
    required: [true, "interior must have img"],
  },
  description: {
    type: String,
    required: [true, "interior must have description"],
  },
  slug: {
    type: String,
  },
});

interiorSchema.pre("save", function (next) {
  this.slug = slugify(this.heading, {
    lower: true,
  });

  next();
});

const interiorModel = mongoose.model("interior", interiorSchema);

module.exports = interiorModel;
