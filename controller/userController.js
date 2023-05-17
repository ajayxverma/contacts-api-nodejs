const asynchandler = require("express-async-handler");
const User = require("../models/userModel");
const { all, use } = require("../routes/userRoutes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Login User
//@route Get /api/user/singin
//@access public
const singInUser = asynchandler(async (req, res) => {
  //   const contact = await Contact.find();
  //   res.status(200).json(contact);
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("All fiels are Mandatory");
  }
  const user = await User.findOne({ email });
  console.log(user);
  console.log(user.password);
  //compare password with hashpassword
  console.log(await bcrypt.compare(password, user.password));

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.UNIQUE_ACCESS_TOKE,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is Invaldi");
  }

  //res.status(200).json("User Logged In");
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

  const hashpassword = await bcrypt.hash(password, 10);
  //console.log("Hashed Password", hashpassword);

  const user = await User.create({
    userName,
    email,
    password: hashpassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  }
  //res.status(200).json("User Created ");
  //req.status(201).json(user);
});

//@desc currentuser User
//@route Get /api/user/current
//@access public
const currentUser = asynchandler(async (req, res) => {
  //   const contact = await Contact.find();
  //   res.status(200).json(contact);
  // const allUser = await User.find();
  // res.status(200).json(allUser);
  res.status(200).json(req.user);
});

const getAllUser = asynchandler(async (req, res) => {
  //   const contact = await Contact.find();
  //   res.status(200).json(contact);
  const allUser = await User.find();
  res.status(200).json(allUser);
  //res.status(200).json("Current user");
});

// const authologin = asynchandler(async (req, res) => {

// });

module.exports = { singInUser, singUpUser, currentUser, getAllUser };
