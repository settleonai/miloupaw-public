require("dotenv").config();

// create an express server with cors
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

// JWT
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

// oAuth
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");
const authConfig = require("./utilities/authConfig");

// models
// const UserModel = require("../models/UserModel");

// auth checker
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-uewzgiti.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://thefnel.com",
  issuer: "https://dev-uewzgiti.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(cors());
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/stripe")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// app.use(auth(authConfig));

// req.isAuthenticated is provided from the auth router
app.get("/private", jwtCheck, (req, res) => {
  res.send("Secured Resource");
  // res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
