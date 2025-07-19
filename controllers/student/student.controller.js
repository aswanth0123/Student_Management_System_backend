import Student from '../../models/student.js';
import StaffPermission from '../../models/staffPermission.js';

// Create Student
export const createStudent = async (req, res) => {
  try {
    const { name, age, grade, contactInfo, parentName, parentContact } = req.body;
    
    // Check if user has permission to create students
    if (req.user.role === 'Staff') {
      const staffPermission = await StaffPermission.findOne({ staffId: req.user.id });
      if (!staffPermission || !staffPermission.permissions.students.canCreate) {
        return res.status(403).json({ message: 'You do not have permission to create students' });
      }
    }

    const student = new Student({
      name,
      age,
      grade,
      contactInfo,
      parentName,
      parentContact
    });

    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Students
export const getAllStudents = async (req, res) => {
  try {
    // Check if user has permission to read students
    if (req.user.role === 'Staff') {
      const staffPermission = await StaffPermission.findOne({ staffId: req.user.id });
      if (!staffPermission || !staffPermission.permissions.students.canRead) {
        return res.status(403).json({ message: 'You do not have permission to view students' });
      }
    }

    const students = await Student.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ students });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user has permission to read students
    if (req.user.role === 'Staff') {
      const staffPermission = await StaffPermission.findOne({ staffId: req.user.id });
      if (!staffPermission || !staffPermission.permissions.students.canRead) {
        return res.status(403).json({ message: 'You do not have permission to view students' });
      }
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json({ student });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Check if user has permission to update students
    if (req.user.role === 'Staff') {
      const staffPermission = await StaffPermission.findOne({ staffId: req.user.id });
      if (!staffPermission || !staffPermission.permissions.students.canUpdate) {
        return res.status(403).json({ message: 'You do not have permission to update students' });
      }
    }

    const student = await Student.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user has permission to delete students
    if (req.user.role === 'Staff') {
      const staffPermission = await StaffPermission.findOne({ staffId: req.user.id });
      if (!staffPermission || !staffPermission.permissions.students.canDelete) {
        return res.status(403).json({ message: 'You do not have permission to delete students' });
      }
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 