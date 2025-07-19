# Student Management System - Backend

A Node.js/Express.js backend for the Student Management System with JWT authentication and role-based access control.

## Features

- **User Authentication**: JWT-based authentication system
- **Role-Based Access Control**: Super Admin and Staff roles with granular permissions
- **Student Management**: Full CRUD operations for student records
- **Staff Management**: Create, read, update, delete staff accounts
- **Permission Management**: Granular permissions for staff members
- **MongoDB Integration**: MongoDB database with Mongoose ODM

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Student_Management_System_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sms
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Seed roles
   node seeder/seedRole.js
   
   # Create super admin user
   node seeder/superAdmin.js
   ```

5. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### User Management (Super Admin Only)
- `POST /api/users/add` - Add new user
- `GET /api/users/getall/:role` - Get users by role
- `DELETE /api/users/delete/:id` - Delete user

### Student Management
- `POST /api/students` - Create student
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Staff Permissions (Super Admin Only)
- `POST /api/staff-permissions` - Assign permissions
- `GET /api/staff-permissions` - Get all permissions
- `GET /api/staff-permissions/:staffId` - Get staff permissions
- `PUT /api/staff-permissions/:staffId` - Update permissions
- `DELETE /api/staff-permissions/:staffId` - Remove permissions

## Role-Based Access

### Super Admin
- Full access to all modules
- Can manage staff accounts
- Can assign/revoke staff permissions
- Can perform all CRUD operations on students

### Staff
- Access based on assigned permissions
- Can only perform operations they have permission for
- Cannot manage other staff or permissions

## Database Models

### User
- name, email, password, role, isActive

### Student
- name, age, grade, contactInfo, parentName, parentContact, enrollmentDate, isActive

### Role
- name, description

### StaffPermission
- staffId, permissions, assignedBy

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based middleware
- Permission-based access control
- Input validation and sanitization

## Error Handling

- Centralized error handling
- Proper HTTP status codes
- Descriptive error messages
- Validation errors

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

## Deployment

1. Set environment variables for production
2. Update MongoDB connection string
3. Set NODE_ENV=production
4. Use PM2 or similar process manager
5. Set up reverse proxy (nginx)

## License

MIT License 