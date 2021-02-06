const express = require("express");
const path = require("path");
const consign = require("consign");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser("asdsa"));
app.use(
  session({
    secret: "ntalk",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

consign({}).include("models").then("controllers").then("routes").into(app);

app.listen(3000, () => {
  console.log("Ntalk no ar. (3000)");
});
