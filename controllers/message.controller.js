const { sendMsg, getAllMsgs } = require("./../services/message.service");

exports.sendMessage = async (req, res) => {
  try {
    const { user } = req;
    const { chat } = req.params;
    const { content } = req.body;

    res.send(await sendMsg(user._id, chat, content));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : 500;
    res.status(s).send({ message: error.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const { user } = req;
    const { chat } = req.params;
    res.json(await getAllMsgs(user._id, chat));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : 500;
    res.status(s).send({ message: error.message });
  }
};
