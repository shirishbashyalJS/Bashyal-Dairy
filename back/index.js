const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer");
const orders = require("./Modal/orderModal");
const admin = require("./Modal/adminModal");
const cors = require("cors");
const PORT = process.env.PORT;

const server = express();

const corsOptions = {
  origin: process.env.ACCESS_URL,
};

server.use(cors(corsOptions));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password if 2FA is enabled
  },
});

server.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("db connect"))
  .catch((err) => console.log(err));

server.get("/activate", (req, res) => {
  res.json({ message: "server activated" });
});
server.post("/order", async (req, res) => {
  const data = req.body;
  const newOrder = new orders(data);
  //save order
  await newOrder
    .save()
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.json(err);
    });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_SEND,
    subject: `New Order Received`,
    text: `Order ${data.product.quantity}kg of ${data.product.name}`,
  };

  await transporter.sendMail(mailOptions);
});
server.get("/order", async (req, res) => {
  try {
    const username = req.headers["name"];
    const contact = req.headers["contact"];
    if (!username || !contact) {
      return res
        .status(400)
        .json({ message: "Missing user information in headers." });
    }
    const order = await orders.find({
      "user.name": username,
      "user.contact": contact,
    });

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "No order found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

server.get("/admin", async (req, res) => {
  const username = req.headers["username"];
  const password = req.headers["password"];
  const adminDetail = await admin.find();
  const orderList = await orders.find();
  if (
    adminDetail[0].username === username &&
    adminDetail[0].password === password
  ) {
    res.status(200).json(orderList);
  } else {
    res.status(404).json({ is: "false" });
  }
});
server.delete("/order/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await orders.findByIdAndDelete(id);
    if (deletedItem) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ message: "Error Happened!" });
    }
  } catch (err) {
    res.json(err);
  }
});

server.listen(PORT, () => {
  console.log("Listening at PORT " + PORT);
});
