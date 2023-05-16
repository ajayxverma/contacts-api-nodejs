const mongoose = require("mongoose");

const connnectDb = async () => {
  try {
    const connnect = await mongoose
      .connect("mongodb://127.0.0.1:27017/contacts")
      
        console.log(
          "Database connnected",
          connnect.connection.host,
          "Databaes Nmae:",
          connnect.connection.name
        )
     
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connnectDb;
