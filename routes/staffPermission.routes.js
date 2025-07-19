import express from 'express';
import { 
  assignStaffPermissions, 
  getStaffPermissions, 
  getAllStaffPermissions, 
  updateStaffPermissions, 
  removeStaffPermissions 
} from '../controllers/staff/staffPermission.controller.js';
import { authCheckMiddleware } from '../middleware/authCheckMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import StaffPermission from '../models/staffPermission.js';

const router = express.Router();

// All routes require authentication
router.use(authCheckMiddleware);

// Route for staff to get their own permissions
router.get('/my-permissions', authorizeRoles('Staff'), async (req, res) => {
  try {
    const staffPermission = await StaffPermission.findOne({ staffId: req.user.id })
      .populate('staffId', 'name email');

    if (!staffPermission) {
      return res.status(404).json({ message: 'Permissions not found' });
    }

    res.status(200).json({ staffPermission });
  } catch (error) {
    console.error('Get my permissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Routes that require Super Admin role
router
  .route('/')
  .post(authorizeRoles('Super_Admin'), assignStaffPermissions)
  .get(authorizeRoles('Super_Admin'), getAllStaffPermissions);

router
  .route('/:staffId')
  .get(authorizeRoles('Super_Admin'), getStaffPermissions)
  .put(authorizeRoles('Super_Admin'), updateStaffPermissions)
  .delete(authorizeRoles('Super_Admin'), removeStaffPermissions);

export default router; 