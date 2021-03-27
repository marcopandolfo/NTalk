const express = require("express");
const path = require("path");
const consign = require("consign");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const error = require("./middleware/error");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

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

consign({}).include("models").then("controllers").then("routes").into(app);
app.use(error.notFound);
app.use(error.serverError);

io.sockets.on("connection", (client) => {
  client.on("send-server", (data) => {
    const msg = "<b>" + data.nome + ":</b> " + data.msg + "<br>";

    client.emit("send-client", msg);
    client.broadcast.emit("send-client", msg);
  });
});

app.listen(3000, () => {
  console.log("Ntalk no ar (3000)");
});
