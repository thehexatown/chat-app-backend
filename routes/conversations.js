const router = require("express").Router();
const Conversation = require("../models/Conversation");
const { create } = require("../services/conversation");

//new conv

router.post("/create", async (req, res) => {
  console.log("iam ruunniong");
  const newConversation = new Conversation({
    User1: req.body.senderId,
    User2: req.body.receiverId,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  // members: { $in: [req.params.userId] },
  try {
    const conversation = await Conversation.find({
      $or: [{ sender: req.params.userId }, { receiver: req.params.userId }],
    }).populate("User2");
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
