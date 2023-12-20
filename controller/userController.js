const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// @desc   register user
// @route  POST /api/users
// access  public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExits = await User.findOne({ email });

    if (userExits) {
      res.status(400);
      throw new Error("user already exits");
    }

    const user = new User({
      name,
      email,
      //   password: bcrypt.hashSync(password, 10),
      password,
    });

    const newUser = await user.save();

    if (newUser) {
      generateToken(res, newUser._id);

      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc   get users
// @route  GET /api/users
// access  private / admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc  Auth user & token
// @route POST /api/users/login
// access public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json("invalid user credential");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (user && passwordCompare) {
      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
    // res.send("auth user");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc   logout user / clear cookie
// @route  POST /api/users
// access  private
const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out Successfully" });
};



// @desc   get user by id
// @route  GET /api/users/:id
// access  private / admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("invalid user");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc   delete user
// @route  DELETE /api/users/:id
// access  private / admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("cannot delete admin user");
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
};

const updateUser = async(req,res) =>{
    try {
        const user = await User.findById(req.params.id);

        if (user) {
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          user.isAdmin = Boolean(req.body.isAdmin);
      
          const updatedUser = await user.save();
      
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
          });
        } else{
            res.status(404).json('user not found')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

module.exports = {
  registerUser,
  getAllUsers,
  authUser,
  logout,
  getUserById,
  deleteUser,
  updateUser
};
