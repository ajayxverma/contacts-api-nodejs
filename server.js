const express = require("express");
const errorHandller = require("./middleware/errorHandler");
const connnectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const { auth } = require("express-openid-connect");
const { route } = require("./routes/userRoutes");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:5001",
  clientID: "8067LhZXQkKI2K9Y3mlWIOeAxq3ofl9n",
  issuerBaseURL: "https://dev-fs6-sm7c.us.auth0.com",
};

connnectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(auth(config));
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandller);
app.listen(port, () => {
  console.log(`The server running on port ${port}`);
});

app.get("/", (req, res) => {
  req.oidc.isAuthenticated()
    ? res.redirect("http:/api/contacts")
    : "logged out";
});
