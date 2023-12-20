const connectDB = require("./config/db");
const dotenv = require("dotenv");
const User = require('./models/userModel')
const users = require('./data/users')
const hotels = require('./data/hotels')
const Hotel = require('./models/hotelModel')

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Hotel.deleteMany()

    const createdUsers = await User.insertMany(users);
    const createdHotels = await Hotel.insertMany(hotels)

    const adminUser = createdUsers[0]._id;
    // await createdUsers.save()


    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
