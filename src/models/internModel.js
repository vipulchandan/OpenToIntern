// Open to Intern Project Requirement
// Models
// Intern Model

// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: [true, 'Email already exists'],
        trim: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return emailRegex.test(email);
            },
            message: 'Invalid email id'
        }
    },
    mobile: {
        type: Number,
        required: [true, 'Please add mobile'],
        unique: [true, 'Mobile already exists'],
        trim: true,
        validate: {
            validator: function (mobile) {
                const mobileRegex = /^[0-9]{10}$/;
                return mobileRegex.test(mobile);
            },
            message: 'Invalid mobile number'
        }
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: [true, 'Please add college'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema);