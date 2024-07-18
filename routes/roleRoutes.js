const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Define routes
router.get('/', roleController.getRoles);
router.post('/add', roleController.addRole);
router.put('/:roleId', roleController.updateRole);
router.delete('/:roleId', roleController.deleteRole);

module.exports = router;

