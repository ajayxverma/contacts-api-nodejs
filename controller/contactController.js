const asynchandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get Contact
//@route Get /api/contacts
//@access public
const getContact = asynchandler(async (req, res) => {
  const contact = await Contact.find();
  res.status(200).json(contact);
});
//@desc Get Contact By Id
//@route Get /api/contacts:id
//@access public
const getContactById = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});
//@desc Add Contact
//@route PUT /api/contacts
//@access public
const addContact = asynchandler(async (req, res) => {
  //console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are Mandatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json({
    message: `New contact is added `,
    contact,
  });
});
//@desc Update Contact
//@route Get /api/contacts:id
//@access public
const updateContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json("Contact Not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
//@desc Delete Contact
//@route Get /api/contacts:id
//@access public
const deleteContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json("Contact Not found");
  }
  await Contact.deleteOne(contact);
  res.status(200).json(contact);
});
module.exports = {
  getContact,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
};
