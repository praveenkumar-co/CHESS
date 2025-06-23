require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const socket = require("socket.io");
const http = require("http");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRoutes = require("./routes/auth");
const socketManager = require('./socketManager');
const app = express();
connectDB();
const server = http.createServer(app);
const io = socket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use("/", authRoutes);
socketManager(io);

app.get("/", (req, res) => {
  res.render("home", {
    title: "Chess Game",
  });
});
app.get("/index", (req, res) => {
  res.render("index", {
    title: "Chess Game",
  });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Not Found" });
});
server.listen(3000, function () {
  console.log(`Server is on 3000`);
});
