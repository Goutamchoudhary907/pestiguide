const mongoose = require('mongoose');
const Crop = require("./Crop");
const environmentalImpactSchema = new mongoose.Schema({
  Soil: {
    Impact_Level: String,
    Notes: String,
  },
  Water: {
    Impact_Level: String,
    Notes: String,
  },
  Wildlife: {
    Impact_Level: String,
    Notes: String,
  },
  "Beneficial Insects": {
    Impact_Level: String,
    Notes: String,
  },
});

const pesticideSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  "Active Ingredients": {
    type: String,
    required: true,
  },
  "Application Method": String,
  "Target Species": String,
  "Safety Precautions": [String],
  "Environmental Impact": environmentalImpactSchema,
  "Usage Instructions": [String],
  Advantages: [String],
  Disadvantages: [String],
  Crops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crop' }]
});

const Pesticide = mongoose.model('Pesticide', pesticideSchema);

module.exports = Pesticide;