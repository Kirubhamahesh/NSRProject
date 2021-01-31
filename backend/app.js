const express = require("express");
const path=require('path')
const bodyParser = require("body-parser");
const moongose = require("mongoose");
const postRoutes=require("./routes/posts")

const app = express();
moongose
  .connect(
    "mongodb+srv://user12:usertan@nodeapp.bsti1.mongodb.net/NSR-prj?retryWrites=true&w=majority"
 
  )
  .then(() => {
    console.log("connected to database! NSR");
  })
  .catch((error) => {
    console.log("connection failed!",error);
  });
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images',express.static(path.join("backend/images")))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-control-Allow-Headers",
    "Origin, X-Requested-With, content-Type, Accept"
  );
  res.setHeader(
    "Access-control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts",postRoutes)

module.exports = app;
