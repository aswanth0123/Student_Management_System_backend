import User from '../../models/user.js';
import Role from '../../models/role.js';

// GET /api/users?role=staff or /api/users?role=user or /api/users (all)
export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.params;
    
    let filter = {};
    if (role) {
      // Find the role ID for the given role name
      const roleDoc = await Role.findOne({ name: role });
      if (!roleDoc) {
        return res.status(400).json({ message: 'Invalid role.' });
      }
      filter.role = roleDoc._id;
    }
    // Populate role name in the result
    const users = await User.find(filter).populate('role', 'name');
    res.status(200).json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
