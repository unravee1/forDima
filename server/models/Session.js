import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Group',
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true,
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
