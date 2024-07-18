const { sequelize } = require('../config/db');
const createUserModel = require('../models/user');

const User = createUserModel(sequelize);

const addUser = async (userData) => {
    return await User.create(userData);
};

const getUserByUsername = async (userName) => {
    return await User.findOne({ where: { userName } });
};

module.exports = {
    addUser,
    getUserByUsername
};
