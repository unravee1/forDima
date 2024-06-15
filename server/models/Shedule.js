import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    trainerName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
