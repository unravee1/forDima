import mongoose from 'mongoose';

const trainerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;
