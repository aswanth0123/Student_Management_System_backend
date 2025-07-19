import StaffPermission from '../../models/staffPermission.js';
import User from '../../models/user.js';
import Role from '../../models/role.js';

// Assign permissions to staff member
export const assignStaffPermissions = async (req, res) => {
  try {
    const { staffId, permissions } = req.body;
    
    // Only Super Admin can assign permissions
    if (req.user.role !== 'Super_Admin') {
      return res.status(403).json({ message: 'Only Super Admin can assign permissions' });
    }

    // Check if staff member exists
    const staffMember = await User.findById(staffId);
    if (!staffMember) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    // Check if staff member has Staff role
    const staffRole = await Role.findOne({ name: 'Staff' });
    if (staffMember.role.toString() !== staffRole._id.toString()) {
      return res.status(400).json({ message: 'User is not a staff member' });
    }

    // Create or update permissions
    const staffPermission = await StaffPermission.findOneAndUpdate(
      { staffId },
      {
        staffId,
        permissions,
        assignedBy: req.user.id
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ 
      message: 'Permissions assigned successfully', 
      staffPermission 
    });
  } catch (error) {
    console.error('Assign permissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get staff permissions
export const getStaffPermissions = async (req, res) => {
  try {
    const { staffId } = req.params;
    
    // Only Super Admin can view permissions
    if (req.user.role !== 'Super_Admin') {
      return res.status(403).json({ message: 'Only Super Admin can view permissions' });
    }

    const staffPermission = await StaffPermission.findOne({ staffId })
      .populate('staffId', 'name email')
      .populate('assignedBy', 'name');

    if (!staffPermission) {
      return res.status(404).json({ message: 'Permissions not found' });
    }

    res.status(200).json({ staffPermission });
  } catch (error) {
    console.error('Get permissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all staff permissions
export const getAllStaffPermissions = async (req, res) => {
  try {
    // Only Super Admin can view all permissions
    if (req.user.role !== 'Super_Admin') {
      return res.status(403).json({ message: 'Only Super Admin can view all permissions' });
    }

    const staffPermissions = await StaffPermission.find()
      .populate('staffId', 'name email')
      .populate('assignedBy', 'name');

    res.status(200).json({ staffPermissions });
  } catch (error) {
    console.error('Get all permissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update staff permissions
export const updateStaffPermissions = async (req, res) => {
  try {
    const { staffId } = req.params;
    const { permissions } = req.body;
    
    // Only Super Admin can update permissions
    if (req.user.role !== 'Super_Admin') {
      return res.status(403).json({ message: 'Only Super Admin can update permissions' });
    }

    const staffPermission = await StaffPermission.findOneAndUpdate(
      { staffId },
      {
        permissions,
        assignedBy: req.user.id
      },
      { new: true }
    );

    if (!staffPermission) {
      return res.status(404).json({ message: 'Permissions not found' });
    }

    res.status(200).json({ 
      message: 'Permissions updated successfully', 
      staffPermission 
    });
  } catch (error) {
    console.error('Update permissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove staff permissions
export const removeStaffPermissions = async (req, res) => {
  try {
    const { staffId } = req.params;
    
    // Only Super Admin can remove permissions
    if (req.user.role !== 'Super_Admin') {
      return res.status(403).json({ message: 'Only Super Admin can remove permissions' });
    }

    const staffPermission = await StaffPermission.findOneAndDelete({ staffId });

    if (!staffPermission) {
      return res.status(404).json({ message: 'Permissions not found' });
    }

    res.status(200).json({ message: 'Permissions removed successfully' });
  } catch (error) {
    console.error('Remove permissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 