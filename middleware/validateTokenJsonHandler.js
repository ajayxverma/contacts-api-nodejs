const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  const autHeader = req.headers.Authorization || req.headers.authorization;

  console.log("This is the authHeader", autHeader);

  if (autHeader && autHeader.startsWith("Bearer")) {
    token = autHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.UNIQUE_ACCESS_TOKE, (err, decoded) => {
      console.log("The toke after slicing is :", token);
      if (err) {
        res.status(400);
        throw new Error("User is not authorized");
      }
      console.log("The decoded :", decoded);
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User not Authorize or token is not valid");
    }
  }
});

module.exports = validateToken;
