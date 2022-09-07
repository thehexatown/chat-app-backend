const router = require("express").Router();
const Room = require("../models/Room");

router.get("/", async (req, res) => {
  try {
    const room = await Room.find();
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
