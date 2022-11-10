const authDao = require("../daos/auth.dao");
const passportUtils = require("../utils/passportUtils");

const registerUser = async (req, res) => {
  try {
    const data = await authDao.findUserByName(req.body.userName);
    if (data)
      return res
        .status(401)
        .json({ success: false, msg: "User Already Exists!" });
    const saltHash = passportUtils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const user = await authDao.registerUser(req.body, salt, hash);
    if (user) {
      const jwt = passportUtils.issueJWT(user);
      res.json({
        success: true,
        user,
        token: jwt.token,
        expiresIn: jwt.expire,
      });
    } else {
      res.json({ success: false, msg: "Unable to register user" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const logInUser = async (req, res) => {
  try {
    const user = await authDao.findUserByName(req.body.userName);
    if (!user)
      return res.status(401).json({ success: false, msg: "User not found" });
    const isValid = passportUtils.validatePassword(
      req.body.password,
      user.hash,
      user.salt
    );
    if (isValid) {
      const tokenObj = passportUtils.issueJWT(user);
      res.status(200).json({
        success: true,
        user,
        token: tokenObj.token,
        expiresIn: tokenObj.expires,
      });
    } else {
      res.status(401).json({ success: false, msg: "Enter valid password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const protectedRoute = (req, res) => {
  try {
    res.status(200).json({ success: true, msg: "Authenticated" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const authController = {
  registerUser,
  logInUser,
  protectedRoute,
};

module.exports = authController;
