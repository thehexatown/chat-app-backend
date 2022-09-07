const {
  register,
  loginUser,
  searchUser,
  allUsers,
} = require("./../services/user.service");
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    res.json(await register(name, email, password, pic));
  } catch (err) {
    console.log({ err });
    const { status } = err;
    s = status ? status : 500;
    res.status(status).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    res.json(await loginUser(email, password));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : "500";
    res.status(s).send({ message: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const { user } = req;
    res.json(await allUsers(user));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : "500";
    res.status(s).send({ message: error.message });
  }
};

exports.searchUserByMailORName = async (req, res) => {
  try {
    const { user } = req;
    const search = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    res.json(await searchUser(search, user._id));
  } catch (error) {
    console.log({ error });
    const { status } = error;
    s = status ? status : "500";
    res.status(s).send({ message: error.message });
  }
};
