import mongoose from "mongoose";
import dotenv from 'dotenv'
import { connectDB } from "../config/db.js";
import Role from "../models/role.js";
import User from "../models/user.js";
dotenv.config();
connectDB();

const seedSuperAdmin = async () => {
  try {
    // Find the Super Admin role
    let superAdminRole = await Role.findOne({ name: 'Super Admin' });
    if (!superAdminRole) {
      superAdminRole = await Role.create({
        name: 'Super Admin',
        description: 'Full access to all modules',
      });
      console.log('Created Super Admin role');
    }

    // Check if a super admin user already exists
    const existingAdmin = await User.findOne({ email: 'superadmin@example.com' });
    if (existingAdmin) {
      console.log('Super Admin user already exists');
      process.exit();
    }

    // Create the super admin user
    const superAdmin = new User({
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: 'SuperSecurePassword123!', // Change this after first login
      role: superAdminRole._id,
      isActive: true
    });
    await superAdmin.save();
    console.log('Super Admin user created');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedSuperAdmin();
