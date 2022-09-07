const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    User1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    User2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
