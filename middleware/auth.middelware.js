const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

exports.authenticate = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from headers
      token = req.headers.authorization.split(" ")[1];

      //   verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   Get user from token
      req.user = await userModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).send("Unauthorized");
    }
  }
  if (!token) {
    res.status(401).send("Unauthorized, No Token");
  }
};
