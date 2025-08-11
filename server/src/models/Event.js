const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  category: {
    type: String,
    enum: ['academic', 'social', 'sports', 'cultural', 'fundraising', 'meeting', 'other'],
    required: [true, 'Event category is required']
  },
  maxAttendees: {
    type: Number,
    min: [1, 'Maximum attendees must be at least 1']
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  currency: {
    type: String,
    default: 'EUR',
    enum: ['EUR', 'USD', 'GBP']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Event organizer is required']
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    attended: {
      type: Boolean,
      default: false
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending'
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }],
  documents: [{
    name: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  requirements: {
    membershipRequired: {
      type: Boolean,
      default: false
    },
    minimumYear: {
      type: Number,
      min: 1,
      max: 10
    },
    facultyRestriction: [String]
  },
  contact: {
    email: String,
    phone: String
  },
  publicEvent: {
    type: Boolean,
    default: true
  },
  registrationDeadline: Date,
  cancellationDeadline: Date
}, {
  timestamps: true
});

// Indexes for better query performance
eventSchema.index({ startDate: 1 });
eventSchema.index({ endDate: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ organizer: 1 });
eventSchema.index({ 'attendees.user': 1 });

// Validation: End date must be after start date
eventSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  } else {
    next();
  }
});

// Virtual for event duration
eventSchema.virtual('duration').get(function() {
  return this.endDate - this.startDate;
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  if (!this.maxAttendees) return null;
  return this.maxAttendees - this.attendees.length;
});

// Virtual for registration status
eventSchema.virtual('isRegistrationOpen').get(function() {
  const now = new Date();
  const registrationDeadline = this.registrationDeadline || this.startDate;
  return this.status === 'published' && now < registrationDeadline && 
         (!this.maxAttendees || this.attendees.length < this.maxAttendees);
});

// Method to check if user is registered
eventSchema.methods.isUserRegistered = function(userId) {
  return this.attendees.some(attendee => 
    attendee.user.toString() === userId.toString()
  );
};

// Method to get attendee information
eventSchema.methods.getAttendeeInfo = function(userId) {
  return this.attendees.find(attendee => 
    attendee.user.toString() === userId.toString()
  );
};

// Static method to find upcoming events
eventSchema.statics.findUpcoming = function(limit = 10) {
  return this.find({
    startDate: { $gte: new Date() },
    status: 'published'
  })
  .sort({ startDate: 1 })
  .limit(limit)
  .populate('organizer', 'firstName lastName email');
};

// Static method to find events by date range
eventSchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    $or: [
      {
        startDate: { $gte: startDate, $lte: endDate }
      },
      {
        endDate: { $gte: startDate, $lte: endDate }
      },
      {
        startDate: { $lte: startDate },
        endDate: { $gte: endDate }
      }
    ]
  }).sort({ startDate: 1 });
};

module.exports = mongoose.model('Event', eventSchema);