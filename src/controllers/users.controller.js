const { User } = require("../models/users.model");

exports.findAll = async (req, res) => {
  return res.send(await User.findAll());
};
