const mongoose = require("mongoose");
const slugify = require("slugify");

const structureSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, "structure must have heading"],
  },
  img: {
    type: String,
    required: [true, "structure must have img"],
  },
  description: {
    type: String,
    required: [true, "structure must have description"],
  },
  slug: {
    type: String,
  },
});

structureSchema.pre("save", function (next) {
  this.slug = slugify(this.heading, {
    lower: true,
  });
  next();
});

const structureModel = mongoose.model("structure", structureSchema);

module.exports = structureModel;
