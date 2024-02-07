const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const Pusher = require("pusher");
require("dotenv").config();

const users = require("./models/users");
const messages = require("./models/messages");

let jsonParser = body_parser.json();
let dbStr = process.env.DATABASE_URL;
let app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(dbStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.get("/api/getAllUsers", async (req, res) => {
  try {
    const data = await users.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/getUserByUsername", async (req, res) => {
  try {
    const data = await users.findOne({ username: req.query.username });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    let id = Math.floor(100000 + Math.random() * 900000);
    const data = new users({
      userId: id,
      username: req.body.username,
      password: req.body.password,
    });
    let dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const pusher = new Pusher({
  appId: "1751754",
  key: "c26bd363f7279ef9fa38",
  secret: "f439589593ae082c963d",
  cluster: "ap2",
  useTLS: true,
});

app.get("/api/getMessagesByUsername", async (req, res) => {
  try {
    const { messageFrom, messageTo } = req.query;
    const filter1 = {};
    const filter2 = {};
    if (messageFrom) {
      filter1.messageFrom = messageFrom;
      filter2.messageFrom = messageTo;
    }
    if (messageTo) {
      filter1.messageTo = messageTo;
      filter2.messageTo = messageFrom;
    }
    const data1 = await messages.find(filter1);
    const data2 = await messages.find(filter2);
    console.log(filter1, filter2)
   
    const finalData = {
        user1: data1,
        user2: data2
    }
    res.json(finalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/message", async (req, res) => {
  try {
    await pusher.trigger("chat", "message", {
        messageFrom: req.body.messageFrom,
        messageTo: req.body.messageTo,
        sentTime: req.body.sentTime,
        message: req.body.message,
    });
    const data = new messages({
      messageFrom: req.body.messageFrom,
      messageTo: req.body.messageTo,
      sentTime: req.body.sentTime,
      message: req.body.message,
    });
    await data.save();
    res.status(200).json([]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

