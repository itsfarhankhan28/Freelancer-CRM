import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['ongoing', 'delivered', 'under maintenance'],
    default: 'ongoing'
  },
  startDate: Date,
  endDate: Date
});

export default projectSchema;
