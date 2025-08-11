import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['ongoing', 'delivered', 'maintenance']
  },
  deliveryDate: {
    type: Date,
  },
  followUpIntervalDays: {
    type: Number, // e.g., 30 days
    default: 30
  },
  nextFollowUpDate: {
    type: Date
  }
});

projectSchema.pre('save', function(next) {
  if (this.deliveryDate && this.followUpIntervalDays) {
    const followUpDate = new Date(this.deliveryDate);
    followUpDate.setDate(followUpDate.getDate() + this.followUpIntervalDays);
    this.nextFollowUpDate = followUpDate;
  }
  next();
});


export default projectSchema;
