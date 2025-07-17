import mongoose from "mongoose";
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

const role = new mongoose.model('Role',roleSchema)
export default role