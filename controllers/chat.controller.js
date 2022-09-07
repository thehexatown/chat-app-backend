const {
  chat,
  fetchAllChats,
  groupChat,
  updateName,
  addUser,
  removeUser,
} = require("./../services/chat.service");

exports.accessChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    res.json(await chat(id, user));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : 500;
    res.status(s).send({ message: error.message });
  }
};

exports.allChats = async (req, res) => {
  try {
    const { user } = req;
    res.json(await fetchAllChats(user._id));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : 500;
    res.status(s).send({ message: error.message });
  }
};

exports.createGroupChat = async (req, res) => {
  try {
    const { user } = req;
    const { chatName, users } = req.body;
    res.json(await groupChat(user, users, chatName));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : 500;
    res.status(s).send({ message: error.message });
  }
};

exports.updateGroupName = async (req, res) => {
  try {
    const { id } = req.params;
    const { chatName } = req.body;
    res.json(await updateName(id, chatName));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : 500;
    res.status(s).send({ message: error.message });
  }
};
exports.addUserToGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    res.json(await addUser(id, userId));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : 500;
    res.status(s).send({ message: error.message });
  }
};
exports.removeUserFormGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    res.json(await removeUser(id, userId));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : 500;
    res.status(s).send({ message: error.message });
  }
};
