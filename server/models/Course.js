import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  extendedDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
