const { sequelize } = require('../config/db');
const createRoleModel = require('../models/role');

const Role = createRoleModel(sequelize);

const getRoles = async () => {
    const roles = await Role.findAll();
    return roles.map(role => {
        const roleData = role.toJSON();
        delete roleData.createdAt;
        delete roleData.updatedAt;
        return roleData;
    });
};

const addRole = async (roleData) => {
    return await Role.create(roleData);
};

const updateRole = async (roleId, roleData) => {
    const [updated] = await Role.update(roleData, { where: { roleId } });
    if (updated) {
        return await Role.findByPk(roleId);
    }
    return null;
};

const deleteRole = async (roleId) => {
    const deleted = await Role.destroy({ where: { roleId } });
    return deleted;
};

module.exports = {
    getRoles,
    addRole,
    updateRole,
    deleteRole
};
