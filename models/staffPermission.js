import mongoose from "mongoose";

const staffPermissionSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  permissions: {
    students: {
      canCreate: { type: Boolean, default: false },
      canRead: { type: Boolean, default: false },
      canUpdate: { type: Boolean, default: false },
      canDelete: { type: Boolean, default: false }
    }
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Ensure one permission record per staff member
staffPermissionSchema.index({ staffId: 1 }, { unique: true });

const StaffPermission = mongoose.model('StaffPermission', staffPermissionSchema);
export default StaffPermission; 