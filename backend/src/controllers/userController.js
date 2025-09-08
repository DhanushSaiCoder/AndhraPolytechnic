let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', avatar: 'https://picsum.photos/seed/john/100/100' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', avatar: 'https://picsum.photos/seed/jane/100/100' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'User', avatar: 'https://picsum.photos/seed/peter/100/100' },
    { id: 4, name: 'Admin User', email: 'admin.user@example.com', role: 'Admin', avatar: 'https://picsum.photos/seed/admin/100/100' },
];

exports.getUsers = (req, res) => {
    res.status(200).json(users);
};

exports.createUser = (req, res) => {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
        return res.status(400).json({ message: 'Please provide name, email, and role' });
    }

    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
        name,
        email,
        role,
        avatar: `https://picsum.photos/seed/${name.split(' ').join('')}/100/100`
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = { ...users[userIndex], name, email, role };
    users[userIndex] = updatedUser;

    res.status(200).json(updatedUser);
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const initialLength = users.length;
    users = users.filter(user => user.id !== parseInt(id));

    if (users.length === initialLength) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
};
