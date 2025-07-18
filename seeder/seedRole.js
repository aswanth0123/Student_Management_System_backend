import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../models/role.js';
import {connectDB} from '../config/db.js';

dotenv.config();
connectDB();

const seedRoles = async () => {
  try {
    const roles = [
      {
        name: 'Super_Admin',
        description: 'Full access to all modules',
        defaultPermissions: {
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true
        }
      },
      {
        name: 'Staff',
        description: 'Staff with restricted access',
        defaultPermissions: {
          canCreate: false,
          canRead: true,
          canUpdate: false,
          canDelete: false
        }
      },
      {
        name: 'Student',
        description: 'Can view their own info',
        defaultPermissions: {
          canCreate: false,
          canRead: true,
          canUpdate: false,
          canDelete: false
        }
      }
    ];

    for (const role of roles) {
      const exists = await Role.findOne({ name: role.name });
      if (!exists) {
        await Role.create(role);
        console.log(`Created role: ${role.name}`);
      }
    }

    console.log('Roles seeded');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedRoles();
