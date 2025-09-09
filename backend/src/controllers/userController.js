const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

exports.createUser = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Please provide email, password, and role' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword,
            role,
        });

        await user.save();
        res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, role } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();
        res.status(200).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    // Ensure the user is trying to change their own password
    // Assuming authMiddleware populates req.user with the logged-in user's ID
    if (req.user.id !== id) {
        return res.status(403).json({ message: 'Unauthorized: You can only change your own password.' });
    }

    if (!password) {
        return res.status(400).json({ message: 'New password is required.' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password.', error });
    }
};