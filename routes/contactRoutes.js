const express = require("express");
const router = express.Router();
const contactcontroller = require("../controller/contactController");

router
  .route("/")
  .get(contactcontroller.getContact)
  .post(contactcontroller.addContact);

router
  .route("/:id")
  .get(contactcontroller.getContactById)
  .put(contactcontroller.updateContact)
  .delete(contactcontroller.deleteContact);

module.exports = router;
