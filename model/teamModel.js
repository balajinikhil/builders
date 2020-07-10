const mongoose = require("mongoose");
const slugify = require("slugify");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Team must have name"],
  },
  description: {
    type: String,
    required: [true, "Team must have description"],
  },
  slug: {
    type: String,
  },

  img: {
    type: String,
  },
});

teamSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const teamModel = mongoose.model("team", teamSchema);
module.exports = teamModel;
