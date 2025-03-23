const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { customerId, roomId, checkInDate, checkOutDate } = req.body;
    
    // Check if room is available
    const room = await Room.findById(roomId);
    if (!room || !room.isAvailable) {
      return res.status(400).json({ message: 'Room not available' });
    }
    
    // Calculate total price (example calculation)
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nightsCount = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nightsCount;
    
    const booking = new Booking({
      customer: customerId,
      room: roomId,
      checkInDate,
      checkOutDate,
      totalPrice
    });
    
    await booking.save();
    
    // Update room availability
    room.isAvailable = false;
    await room.save();
    
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.params.userId })
      .populate('room')
      .sort({ createdAt: -1 });
      
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;