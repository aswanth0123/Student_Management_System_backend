import User from '../../models/user.js';
import Role from '../../models/role.js';

// POST /api/users/add
// Expects: { name, email, password, role }
export const addUser = async (req, res) => {
  console.log('adding');
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Optionally, check if role exists in Role collection
    let userRole = await Role.findOne({ name: role });
    if (!userRole) {
      return res.status(400).json({ message: 'Invalid role.' });
    }

    // Create user
    const newUser = new User({
      name,
      email,
      password, // Assume password hashing is handled in User model pre-save hook
      role: userRole._id,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', user: { id: newUser._id, name, email, role } });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
