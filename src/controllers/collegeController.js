const CollegeModel = require('../models/collegeModel');
const InternModel = require('../models/internModel');
const validUrl = require('valid-url');

const createCollege = async (req, res) => {
    try {
        const { name, fullName, logoLink } = req.body;

        // Name validation
        if(!name) {
            return res.status(400).send({ 
                status: false,
                message: 'College name is required'
             });
        }
        const existingCollege = await CollegeModel.findOne({ name });
        if(existingCollege) {
            return res.status(400).send({ 
                status: false,
                message: 'College already exists'
             });
        }

        // Full Name validation
        if(!fullName) {
            return res.status(400).send({ 
                status: false,
                message: 'College full name is required'
             });
        }

        // Logo Link validation
        if(!logoLink) {
            return res.status(400).send({ 
                status: false,
                message: 'College logo link is required'
             });
        }
        if(!validUrl.isWebUri(logoLink)) {
            return res.status(400).send({ 
                status: false,
                message: 'College logo link is invalid'
             });
        }
        const logoLinkRegex = /\.(jpeg|jpg|gif|png)$/i;
        if(!logoLink.match(logoLinkRegex)) {
            return res.status(400).send({ 
                status: false,
                message: 'College logo link is invalid'
             });
        }
        
        // Create College
        const newCollege = await CollegeModel.create({ name, fullName, logoLink });

        res.status(201).send({
            status: true,
            message: 'College created successfully',
            data: newCollege
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message
        });
    }
}

const getCollege = async (req, res) => {
    try {
        const { collegeName } = req.query;
        
        // Name validation
        const college = await CollegeModel.findOne({ name: collegeName });
        if(!college) {
            return res.status(404).send({ 
                status: false,
                message: 'College not found'
             });
        }

        // Interns details based on college
        const interns = await InternModel.find({ collegeId: college._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 });
        if(!interns.length) {
            return res.status(404).send({ 
                status: false,
                message: 'No interns found for this college'
             });
        }

        const collegeDetails = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
            interns: interns
        }

        res.status(200).send({
            status: true,
            message: 'College details fetched successfully',
            data: collegeDetails
        })

    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message
        });
    }
}

module.exports = {
    createCollege,
    getCollege
}