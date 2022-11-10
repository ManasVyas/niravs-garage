const User = require("../models/user.model");

const findUsers = () => User.find();

const addUser = (user, salt, hash) => {
  const newUser = new User({
    userName: user.userName,
    hash,
    salt,
    role: user.role,
    contactNumber: user.contactNumber,
  });
  return newUser.save();
};

const findUserByName = (userName) => User.findOne({ userName });

const findUserById = (id) => User.findById(id);

const updateUser = (user, hash, salt) => {
  const updatedUser = {
    userName: user.userName,
    hash,
    salt,
    role: user.role,
    contactNumber: user.contactNumber,
  };
  return User.findByIdAndUpdate(user._id, updatedUser, {
    useFindAndModify: false,
  });
};

const deleteUser = (id) => User.findByIdAndDelete(id);

const userDao = {
  findUsers,
  findUserByName,
  findUserById,
  addUser,
  updateUser,
  deleteUser,
};

module.exports = userDao;
