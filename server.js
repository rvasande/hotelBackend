const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const { notFound, errorHandler} = require('./middleware/errorMiddleware.js')
const port = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoute.js')
const hotelRoute = require('./routes/hotelRoute.js')

connectDB(); //connect to mongoDB

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/hotels",hotelRoute)

app.get("/", (req, res) => {
    res.send("API is running....");
  });
  
  
  app.use(notFound);
  app.use(errorHandler);


  app.listen(port, () => console.warn(`listening on port ${port}`));