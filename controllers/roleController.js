const roleRepository = require('../repository/roleRepository');

const getRoles = async (req, res) => {
    try {
        const roles = await roleRepository.getRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addRole = async (req, res) => {
    const { roleName, desc } = req.body;
    try {
        const newRole = await roleRepository.addRole({ roleName, desc });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRole = async (req, res) => {
    const { roleId } = req.params;
    const { roleName, desc } = req.body;
    try {
        const updatedRole = await roleRepository.updateRole(roleId, { roleName, desc });
        if (updatedRole) {
            res.status(200).json(updatedRole);
        } else {
            res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRole = async (req, res) => {
    const { roleId } = req.params;
    try {
        const deleted = await roleRepository.deleteRole(roleId);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Role not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRoles,
    addRole,
    updateRole,
    deleteRole
};
