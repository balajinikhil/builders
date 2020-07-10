const mongoose = require("mongoose");
const slugify = require("slugify");

const arcSchema = new mongoose.Schema({
  heading: {
    type: String,
    require: [true, "Img name is required"],
  },
  description: {
    type: String,
    require: [true, "description is required"],
  },
  img: {
    type: String,
    require: [true, "imgsrc is required"],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
  },
});

arcSchema.pre("save", function (next) {
  this.slug = slugify(this.heading, {
    lower: true,
  });
  next();
});

const arcModel = mongoose.model("arc", arcSchema);
module.exports = arcModel;
