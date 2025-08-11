// MongoDB initialization script
db = db.getSiblingDB('gestion_centrale');

// Create default admin user
db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@ucl.be",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0JvV3.XvZu", // password: admin123
  role: "admin",
  studentId: "ADMIN001",
  membershipStatus: "active",
  membershipDate: new Date(),
  emailVerified: true,
  permissions: [
    "view_members",
    "manage_members", 
    "view_events",
    "manage_events",
    "view_finances",
    "manage_finances",
    "view_communications",
    "manage_communications",
    "admin_access"
  ],
  createdAt: new Date(),
  updatedAt: new Date()
});

print('Database initialized with default admin user');
print('Email: admin@ucl.be');
print('Password: admin123');