const Employee = require("../models/user");
const hashPassword = require("../utils/hashpassword");
const { generateToken } = require("../utils/genrateToken");
const matchPaswsord = require("../utils/matchpassword");

//register
exports.register = async (req, res) => {
  try {
    const { name, work_email, password } = req.body;

    const employeeExist = await Employee.findOne({ work_email });
    if (employeeExist) {
      return res.status(409).send({
        message: "User with email already Exist",
      });
    }

    let hashedPassword = await hashPassword(password);
    await Employee.create({
      name,
      work_email,
      password: hashedPassword,
    });

    res.status(201).send({
      message: "Register successfully ",
    });
  } catch (error) {
    const { status } = error;
    s = status ? status : 500;
    return res.status(s).send({
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { work_email, password } = req.body;

    const employeeExist = await Employee.findOne({ work_email });

    //match password
    if (!employeeExist) {
      throw { status: 401, message: "Invalid Email or Password" };
    }

    const isPasswordMatch = await matchPaswsord(
      password,
      employeeExist.password
    );
    if (isPasswordMatch) {
      // const token = generateToken(employeeExist.id);
      res.status(200).send({ message: "welcome", user: employeeExist });
    } else {
      throw { status: 401, message: "Invalid Email or Password" };
    }
  } catch (error) {
    const { status } = error;

    s = status ? status : 500;
    return res.status(s).send({
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  const { onlineUsers } = req.body;
  console.log(onlineUsers);
  try {
    let users = [];
    for (let i = 0; i < onlineUsers.length; i++) {
      const user = await Employee.findById(onlineUsers[i].userId);
      users.push(user);
    }
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const user = await Employee.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
