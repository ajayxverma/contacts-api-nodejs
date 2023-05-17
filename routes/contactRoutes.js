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

router.get("/login", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

module.exports = router;
