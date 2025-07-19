import express from 'express';
import { addUser } from '../controllers/Usermanagement/adduser.js';
import { authCheckMiddleware } from '../middleware/authCheckMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { getAllUsers } from '../controllers/Usermanagement/getusers.js';
import { deleteUser } from '../controllers/Usermanagement/deleteuser.js';
import { updateUser } from '../controllers/Usermanagement/updateuser.js';

const router = express.Router();

router
  .route("/add")
  .post(authCheckMiddleware, authorizeRoles("Super_Admin"), addUser);

// GET /api/users/staffs - get all staff users
router
  .route("/getall/:role")
  .get(authCheckMiddleware, authorizeRoles("Super_Admin"),getAllUsers);

// PUT /api/users/update/:id - update user by id
router
  .route("/update/:id")
  .put(authCheckMiddleware, authorizeRoles("Super_Admin"), updateUser);

// DELETE /api/users/:id - delete user by id
router
  .route("/delete/:id")
  .delete(authCheckMiddleware, authorizeRoles("Super_Admin"), deleteUser);

export default router;
