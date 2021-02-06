const express = require("express");
const path = require("path");
const consign = require("consign");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const error = require("./middleware/error");
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
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(error.notFound);
app.use(error.serverError);

consign({}).include("models").then("controllers").then("routes").into(app);

app.listen(3000, () => {
  console.log("Ntalk no ar. (3000)");
});
