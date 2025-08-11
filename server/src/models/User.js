const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  studentId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['member', 'officer', 'treasurer', 'president', 'admin'],
    default: 'member'
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  dateOfBirth: {
    type: Date
  },
  faculty: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: 1,
    max: 10
  },
  membershipStatus: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'alumni'],
    default: 'active'
  },
  membershipDate: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  },
  permissions: [{
    type: String,
    enum: [
      'view_members',
      'manage_members',
      'view_events',
      'manage_events',
      'view_finances',
      'manage_finances',
      'view_communications',
      'manage_communications',
      'admin_access'
    ]
  }],
  lastLogin: {
    type: Date
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ studentId: 1 });
userSchema.index({ role: 1 });
userSchema.index({ membershipStatus: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
  this.password = await bcrypt.hash(this.password, rounds);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get user's full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Set default permissions based on role
userSchema.pre('save', function(next) {
  if (this.isModified('role')) {
    switch (this.role) {
      case 'member':
        this.permissions = ['view_members', 'view_events'];
        break;
      case 'officer':
        this.permissions = ['view_members', 'manage_members', 'view_events', 'manage_events', 'view_communications'];
        break;
      case 'treasurer':
        this.permissions = ['view_members', 'view_events', 'view_finances', 'manage_finances'];
        break;
      case 'president':
        this.permissions = ['view_members', 'manage_members', 'view_events', 'manage_events', 'view_finances', 'manage_finances', 'view_communications', 'manage_communications'];
        break;
      case 'admin':
        this.permissions = ['view_members', 'manage_members', 'view_events', 'manage_events', 'view_finances', 'manage_finances', 'view_communications', 'manage_communications', 'admin_access'];
        break;
    }
  }
  next();
});

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);