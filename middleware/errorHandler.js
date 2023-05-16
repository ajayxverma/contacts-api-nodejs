const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.json({ message: err.message, stackTrace: err.stackTrace, });

//   switch (statusCode) {
//     case constants.VALIDATION_ERROR:
//       res.json({
//         title: "Validation Error",
//         message: err.message,
//         stackTrace: err.stackTrace,
//       });
//       break;
//     default:
//       console.log("no Error All good");
//   }
};

module.exports = errorHandler;
