const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
  },
  {
    timestamps: true,
  }
);

const hotelSchema = new mongoose.Schema({
  name: String,
  address: String,
  slug: String,
  rating: Number,
  pricePerNight: Number,
  reviews: [reviewSchema],
  thumbnail: String,
  images: [
    {
      img: String
    }
  ],
  aboutThePlace: String,
  features: [
    {
      text: String
    }
  ],
  rooms: [
    {
      content: String
    }
  ]
},
{
  timestamps: true,
}
);

// Create model
const hotel = mongoose.model('hotel', hotelSchema);

module.exports = hotel;
