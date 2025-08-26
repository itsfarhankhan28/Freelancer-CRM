import mongoose from 'mongoose';
import projectSchema from './Projects.js';

const clientSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",          // link each client to the freelancer (user)
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  address: String,

  projects: [projectSchema], // Embedded array

  followUpInterval: {
    type: Number, // in days
    required: true
  },
  lastContacted: {
    type: Date,
    default: Date.now
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
