//initializing a server
//import a package
const express = require("express");
//we execute it
const app = express();
// for env
const dotenv = require("dotenv/config");
//connect to DB
const mongoose = require("mongoose");
//we need it parse the string data when we post it
const bodyParser = require("body-parser");
const cors = require("cors");

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());
//Import Routes
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);
//ROUTES
app.get("/", (req, res) => {
  res.send("We are on home");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB!");
  }
);

//how to start listening to the server
app.listen(3000);
