import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['Ongoing', 'Delivered', 'Under Maintenance'],
    default: 'Ongoing'
  },
  startDate: Date,
  endDate: Date
});

export default projectSchema;
