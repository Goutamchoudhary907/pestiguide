const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const Pesticide = require('../models/Pesticide');

router.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.crop?.trim().toLowerCase();
        if (!searchTerm) {
            return res.status(400).json({ 
                message: 'Crop name is required',
                example: '/api/pests?crop=jowar'
            });
        }
        const seasonData = await Crop.aggregate([
            { $unwind: "$crops" },
            { $match: {
                $expr: {
                    $or: [
                        // Exact match (case-insensitive)
                        { $eq: [
                            { $toLower: "$crops.name" },
                            searchTerm
                        ]},
                        // Match primary name (before slash)
                        { $eq: [
                            { $toLower: { $arrayElemAt: [{ $split: ["$crops.name", "/"] }, 0] }},
                            searchTerm
                        ]},
                        // Match alternate name (after slash)
                        { $eq: [
                            { $toLower: { $arrayElemAt: [{ $split: ["$crops.name", "/"] }, 1] }},
                            searchTerm
                        ]}
                    ]
                }
            }},
            { $limit: 1 }, // Only need one match
            { $project: {
                _id: 0,
                crop: "$crops"
            }}
        ]);

        if (!seasonData.length) {
            return res.status(404).json({ 
                message: `Crop '${searchTerm}' not found`,
                availableCrops: await getAvailableCrops()
            });
        }

        const pesticides = await Pesticide.find({
    _id: { $in: seasonData[0].crop.pesticides }
}).select({
    Name: 1,
    "Active Ingredients": 1,
    "Application Method": 1,
    imageUrl: 1
});

        res.json(pesticides);
    } catch (error) {
        console.error('Error fetching pests:', error);
        res.status(500).json({ 
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

async function getAvailableCrops() {
    const seasons = await Crop.find({});
    return seasons.flatMap(season => season.crops.map(c => c.name));
}

module.exports = router;