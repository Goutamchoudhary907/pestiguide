const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
  season: {
    type: String,
    required: true,
  },
  crops: [
    {
      name: {
        type: String,
        required: true,
      },
      pesticides: [{ type: Schema.Types.ObjectId, ref: 'Pesticide' }]
    }
  ],
});

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;