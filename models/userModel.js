const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName : {
        type: String,
        required: [true, "Please add User Name"],
    },
    email: {
        type: String,
        required: [true, "Please add email "],
        unique: [true, "Email is already registred"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);