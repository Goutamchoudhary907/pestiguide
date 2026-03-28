// backend/routes/getCrops.js
const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// Route to get crops for a specific season
router.get('/crops', async (req, res) => {
  const { season } = req.query;

  if (!season) {
    return res.status(400).json({ message: 'Season parameter is required.' });
  }

  try {
    const seasonData = await Crop.findOne({ season: season }).populate('crops');
    if (seasonData && seasonData.crops) {
      res.json(seasonData.crops);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching crops by season:', error);
    res.status(500).json({ message: 'Error fetching crops.' });
  }
});

router.get('/crops/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required.' });
  }

  try {
    const seasonData = await Crop.findOne({
      'crops': {
        $elemMatch: {
          'name': { $regex: new RegExp('^' + query + '$', 'i') } 
        }
      }
    });

    if (seasonData) {
      const matchingCrops = seasonData.crops.filter(crop =>
        new RegExp('^' + query + '$', 'i').test(crop.name)
      );
      res.json(matchingCrops);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error searching for crops:', error);
    res.status(500).json({ message: 'Error searching for crops.' });
  }
});


module.exports = router;