const express = require("express");
var bodyParser = require("body-parser");
let RestEx = require("restex");
require("dotenv").config();
var serveStatic = require("serve-static");
const path = require("path");
const cors = require("cors");
let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(path.join(__dirname, "app/build")));
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/app/build/index.html");
});

let restex = new RestEx(app, {
  database: {
    provider: "mongo", //mongodb,mysql
    conn: {
      uri: process.env.DB_URI
    }
  }
});
let UserModel = restex.model("users");
let users = [
  {
    name: "Sunil More",
    email: "sunilmore690@gmail.com",
    password: "sunil",
    role: "developer"
  },
  {
    name: "Scott Tiger",
    email: "scott@tiger.com",
    password: "scott",
    role: "admin"
  }
];
UserModel.create(users);
//adding  some sample users

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(8081, function() {
  console.log("restex-mongod-demo listening on 8081");
});
