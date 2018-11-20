// ExperiencesModel.js
var mongoose = require("mongoose");
// Setup schema
var experiencesSchema = mongoose.Schema({
  company: {
    type: String,
    required: [true]
  },
  logo: {
    type: String,
    required: [true]
  },
  spanTime: {
    type: String,
    required: [true]
  },
  jobTitle: {
    type: String,
    required: [true]
  },
  inCharge: {
    type: String,
    required: [true]
  },
  order: {
    type: Number,
    require: [true]
  }
});
// Export Experiences model
var Experiences = (module.exports = mongoose.model(
  "Experiences",
  experiencesSchema
));
module.exports.get = function(callback, limit) {
  Experiences.find(callback).limit(limit);
};
