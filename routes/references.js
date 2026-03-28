const express = require('express');
const router = express.Router();
const Reference = require('../models/reference');

// GET all references
router.get('/', async (req, res) => {
  try {
    const references = await Reference.find();
    res.json(references);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single reference
router.get('/:id', async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) return res.status(404).json({ message: 'Reference not found' });
    res.json(reference);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE reference
router.post('/', async (req, res) => {
  const reference = new Reference({
    clientName: req.body.clientName,
    company: req.body.company,
    testimonial: req.body.testimonial,
    rating: req.body.rating
  });

  try {
    const newReference = await reference.save();
    res.status(201).json(newReference);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE reference
router.put('/:id', async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) return res.status(404).json({ message: 'Reference not found' });
    
    if (req.body.clientName) reference.clientName = req.body.clientName;
    if (req.body.company) reference.company = req.body.company;
    if (req.body.testimonial) reference.testimonial = req.body.testimonial;
    if (req.body.rating) reference.rating = req.body.rating;
    
    const updatedReference = await reference.save();
    res.json(updatedReference);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE reference
router.delete('/:id', async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) return res.status(404).json({ message: 'Reference not found' });
    
    await reference.deleteOne();
    res.json({ message: 'Reference deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;