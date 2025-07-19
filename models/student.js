import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  age: { 
    type: Number, 
    required: true,
    min: 3,
    max: 25
  },
  grade: { 
    type: String, 
    required: true,
    enum: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade']
  },
  contactInfo: {
    email: { 
      type: String, 
      required: true,
      lowercase: true 
    },
    phone: { 
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    }
  },
  parentName: {
    type: String,
    required: true
  },
  parentContact: {
    type: String,
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
export default Student; 