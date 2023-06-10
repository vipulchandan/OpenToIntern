// Open to Intern Project Requirement
// Models
// College Model

// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'College name is required'],
        unique: true,
        trim: true,
        example: 'iith'
    },
    fullName: {
        type: String,
        required: [true, 'College full name is required'],
        trim: true,
        example: 'Indian Institute of Technology, Hyderabad'
    },
    logoLink: {
        type: String,
        required: [true, 'College logo link is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);