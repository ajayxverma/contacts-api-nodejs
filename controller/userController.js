const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const { all } = require("../routes/userRoutes");
//@desc Login User
//@route Get /api/user/singin
//@access public
const singInUser = asynchandler(async (req, res) => {
  //   const contact = await Contact.find();
  //   res.status(200).json(contact);

  res.status(200).json("User Logged In");
});

//@desc Login User
//@route Get /api/user/sigup
//@access public
const singUpUser = asynchandler(async (req, res) => {
  //   const contact = await Contact.find();
  //   res.status(200).json(contact);
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User is Alread registred");
  }

  //const hashpassword = await bcrypt.hash(password, 10);
  //console.log(hashpassword);

  const user = await User.create({
    userName,
    email,
    password,
  });
  res.status(200).json("User Created ");
  req.status(201).json(user);
  
});

//@desc currentuser User
//@route Get /api/user/current
//@access public
const currentUser = asynchandler(async (req, res) => {
  //   const contact = await Contact.find();
  //   res.status(200).json(contact);
    const allUser = await User.find();
  res.status(200).json(allUser);
  res.status(200).json("Current user");
});

module.exports = { singInUser, singUpUser, currentUser };
