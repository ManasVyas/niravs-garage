const userDao = require("../daos/user.dao");
const passportUtils = require("../utils/passportUtils");

const addUser = async (req, res) => {
  try {
    const user = await userDao.findUserByName(req.body.userName);
    if (user)
      return res
        .status(400)
        .json({ success: false, msg: "User already exists!" });
    const saltHash = passportUtils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const data = await userDao.addUser(req.body, salt, hash);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findUsers = async (req, res) => {
  try {
    const data = await userDao.findUsers();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userDao.findUserById(req.body._id);
    if (!user)
      return res.status(401).json({ success: false, msg: "User not found!" });
    const data = await userDao.updateUser(req.body, user.hash, user.salt);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await userDao.findUserById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "User not found!" });
    const user = await userDao.deleteUser(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const userController = {
  addUser,
  findUsers,
  updateUser,
  deleteUser,
};

module.exports = userController;
