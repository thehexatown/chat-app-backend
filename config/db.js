const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://husnain:1234@cluster0.hdhfded.mongodb.net/chat?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("Error:", err.message);
    process.exit();
  }
};

module.exports = connectDB;
