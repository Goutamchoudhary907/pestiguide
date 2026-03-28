const express = require('express');
const router = express.Router();
const Pesticide = require('../models/Pesticide');

router.get('/:id', async (req, res) => {
    console.log('GET /api/pesticides/:id received', req.params.id);
    try {
        const pesticide = await Pesticide.findById(req.params.id);
        if (!pesticide) {
            console.log('Pesticide not found in database');
            return res.status(404).json({ message: 'Pesticide not found' });
        }
        console.log('Pesticide found:', pesticide);
        res.json(pesticide);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;