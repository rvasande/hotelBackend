const Hotel = require("../models/hotelModel");

const createHotel = async (req, res) => {
  const hotel = new Hotel({
    name: "rama international hotel",
    address: "lorem ipsum sample",
    slug: "lorem ipsum sample",
    rating: 8,
    pricePerNight: 590,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1RSM_51_utlFlDsbaAd8w6ZMoSibFsHwQpA&usqp=CAU",
    images: [
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1RSM_51_utlFlDsbaAd8w6ZMoSibFsHwQpA&usqp=CAU",
      },
    ],
    aboutThePlace: "sample only",
    features: [{ text: "sample only" }],
    rooms: [{ content: "sample only" },{ content: "new data" }],
  });

  const newHotel = await hotel.save()
    res.status(201).json(newHotel)
};

const updateHotel = async(req, res) =>{
try {
  const { name, address , slug, rating, pricePerNight,thumbnail,images,aboutThePlace,features,rooms}= req.body

const hotel = await Hotel.findById(req.params.id)
if (hotel) {
  hotel.name=name || hotel.name 
  hotel.address=address || hotel.address
  hotel.slug=slug || hotel.slug
  hotel.rating=rating || hotel.rating
  hotel.pricePerNight=pricePerNight || hotel.pricePerNight
  hotel.thumbnail=thumbnail || hotel.thumbnail
  hotel.images=images || hotel.images
  hotel.aboutThePlace=aboutThePlace || hotel.aboutThePlace
  hotel.features=features || hotel.features
  hotel.rooms=rooms || hotel.rooms

  const updatedHotel = await hotel.save()
  res.status(200).json(updatedHotel)

}else{

}

} catch (error) {
  res.status(404).json({message:error.message})
}
}
 
const deleteHotel = async(req, res) =>{
  try {
    const hotel = await Hotel.findById(req.params.id)
    if(hotel){
      await Hotel.deleteOne({ _id: hotel._id });
      res.json({ message: "hotel removed" });
    }else{
      res.json('not found')
    }
  } catch (error) {
    res.status(404).json({message:error.message})
  }
}

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      const review = {
        name,
        rating: Number(rating),
        comment,
      };

      hotel.reviews.push(review);
      await hotel.save();
      res.status(201).json("review added");
    } else {
      res.status(404);
      throw new Error("resource not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getTopHotels = async (req, res) => {
  const hotel = await Hotel.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(hotel);
};

const getPriceHighToLow = async (req, res) => {
  const highPriceRoom = await Hotel.find({})
    .sort({ pricePerNight: -1 })
    .limit(2);
  res.status(200).json(highPriceRoom);
};

const getPriceLowToHigh = async (req, res) => {
  const highPriceRoom = await Hotel.find({})
    .sort({ pricePerNight: 1 })
    .limit(2);
  res.status(200).json(highPriceRoom);
};

module.exports = {
  getAllHotels,
  getHotelById,
  getTopHotels,
  getPriceHighToLow,
  getPriceLowToHigh,
  createReview,
  createHotel,
  updateHotel,
  deleteHotel
};
