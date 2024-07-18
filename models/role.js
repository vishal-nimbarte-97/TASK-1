const { DataTypes } = require('sequelize');

const RoleModel = (sequelize) => {
    const Role = sequelize.define('Role', {
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
        tableName: 'Roles',
    });

    return Role;
};

module.exports = RoleModel;
