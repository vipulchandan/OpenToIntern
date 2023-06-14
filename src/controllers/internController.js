const InternModel = require('../models/internModel');
const CollegeModel = require('../models/collegeModel');

const createIntern = async (req, res) => {
    try {
        const { name, email, mobile, collegeName } = req.body;

        // Name Validation
        if (!name) {
            return res.status(400).send({
                status: false,
                message: 'Please add name'
            });
        }

        // Email Validation
        if (!email) {
            return res.status(400).send({
                status: false,
                message: 'Please add email'
            });
        }
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return res.status(400).send({
                status: false,
                message: 'Invalid email id'
            });
        }
        const emailExists = await InternModel.findOne({ email });
        if (emailExists) {
            return res.status(400).send({
                status: false,
                message: 'Email already exists'
            });
        } 

        // Mobile Validation
        if (!mobile) {
            return res.status(400).send({
                status: false,
                message: 'Please add mobile'
            });
        }
        if (!mobile.match(/^[0-9]{10}$/)) {
            return res.status(400).send({
                status: false,
                message: 'Invalid mobile number'
            });
        }
        const mobileExists = await InternModel.findOne({ mobile });
        if (mobileExists) {
            return res.status(400).send({
                status: false,
                message: 'Mobile already exists'
            });
        }

        // College Validation
        if(!collegeName) {
            return res.status(400).send({
                status: false,
                message: 'Please add college name'
            });
        }
        let college = await CollegeModel.findOne({ name: collegeName, isDeleted: false });
        if (!college) {
            return res.status(404).send({
                status: false,
                message: 'College not found'
            });
        }
        const intern = new InternModel({
            name,
            email,
            mobile,
            collegeId : college._id
        })
        await intern.save();
        // let collegeId = college._id;
        // req.body.collegeId = collegeId;
        
        // // Create Intern
        // const newIntern = await InternModel.create(req.body);

        res.status(201).send({
            status: true,
            message: 'Intern created successfully',
            data: intern
        });

    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = {
    createIntern
}
