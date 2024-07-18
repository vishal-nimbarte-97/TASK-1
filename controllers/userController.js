const userRepository = require('../repository/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

const registerUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await userRepository.addUser({ userName, password: hashedPassword });
        
        const token = jwt.sign({ userId: newUser.userId }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ newUser, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await userRepository.getUserByUsername(userName);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ user, token });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};
