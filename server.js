const express = require('express');
const { connection, sequelize } = require('./config/db');

const createUserModel = require('./models/user');
const createRoleModel = require('./models/role');
const createUserBasicInfoModel = require('./models/userBasicInfo');

const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Database connection
connection();

// Create models
const User = createUserModel(sequelize);
const Role = createRoleModel(sequelize);
const UserBasicInfo = createUserBasicInfoModel(sequelize);

// Define associations
UserBasicInfo.belongsTo(User, { foreignKey: 'userId' });
UserBasicInfo.belongsTo(Role, { foreignKey: 'roleId' });

// Synchronize all models
sequelize.sync({ force: false })
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch(err => {
        console.error('Error synchronizing models:', err);
    });

// Role routes
app.use('/roles', roleRoutes);

// User routes
app.use('/users', userRoutes);

// Simple route
app.get('/', (req, res) => {
    res.send('Hello, World! Server is running.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
