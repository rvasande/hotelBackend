const express = require('express');
const { getAllHotels,getHotelById, getTopHotels, getPriceHighToLow, getPriceLowToHigh, createReview, createHotel, updateHotel, deleteHotel } = require('../controller/hotelController');
const checkObjectId = require('../middleware/CheckObjectId')
const { protect, admin} = require('../middleware/authMiddleware')
const router = express.Router();

router.route('/').get(getAllHotels).post(protect, admin,createHotel)
router.get('/top', getTopHotels)
router.get('/price/high',getPriceHighToLow)
router.get('/price/low',getPriceLowToHigh)
router.route('/:id').get(checkObjectId,getHotelById).put(protect, admin,updateHotel).delete(protect, admin,deleteHotel)

router.route("/:id/reviews").post(checkObjectId,createReview)

module.exports = router;