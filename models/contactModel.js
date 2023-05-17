const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the contact Name"],
    },
    email: {
      type: String,
      required: [true, "please add the contact Name"],
    },
    phone: {
      type: String,
      required: [true, "please add the contact Name"],
    },
  },
  {
    timestamps: true,
  }
);
//contact is the Name and ContactSchema is the function passed in
module.exports = mongoose.model("Contact", contactSchema);
