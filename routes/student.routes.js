import express from 'express';
import { 
  createStudent, 
  getAllStudents, 
  getStudentById, 
  updateStudent, 
  deleteStudent 
} from '../controllers/student/student.controller.js';
import { authCheckMiddleware } from '../middleware/authCheckMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

// All routes require authentication
router.use(authCheckMiddleware);

// Student CRUD routes - accessible by Super Admin and Staff (with permissions)
router
  .route('/')
  .post(authorizeRoles('Super_Admin', 'Staff'), createStudent)
  .get(authorizeRoles('Super_Admin', 'Staff'), getAllStudents);

router
  .route('/:id')
  .get(authorizeRoles('Super_Admin', 'Staff'), getStudentById)
  .put(authorizeRoles('Super_Admin', 'Staff'), updateStudent)
  .delete(authorizeRoles('Super_Admin', 'Staff'), deleteStudent);

export default router; 