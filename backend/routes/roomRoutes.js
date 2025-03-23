const express = require('express');
const router = express.Router();
const Room = require('../models/room');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new room (admin only)
router.post('/', async (req, res) => {
  try {
    const { roomNumber, type, price, capacity, amenities } = req.body;
    
    // Check if room already exists
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room already exists' });
    }
    
    const room = new Room({
      roomNumber,
      type,
      price,
      capacity,
      amenities
    });
    
    await room.save();
    
    res.status(201).json({ message: 'Room added successfully', room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;