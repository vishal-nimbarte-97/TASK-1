const { DataTypes } = require('sequelize');

const createUserBasicInfoModel = (sequelize) => {
    const UserBasicInfo = sequelize.define('UserBasicInfo', {
        userBsInId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Roles',
                key: 'roleId',
            },
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'userId',
            },
            allowNull: false,
        },
    }, {
        timestamps: true,
        tableName: 'UserBasicInfo',
    });

    return UserBasicInfo;
};

module.exports = createUserBasicInfoModel;
