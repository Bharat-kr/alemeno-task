import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
        enum: ['content_creator', 'sound_creator'],
    },
    subscription_type: {
        type: String,
        required: true,
        enum: ['free', 'standard', 'premium'],
        default: 'free',
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const model = mongoose.model('User', UserSchema);

export default model;
