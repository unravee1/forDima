import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  }, {
    timestamps: true,
  });

const Group = mongoose.model('Group', groupSchema);

export default Group;
