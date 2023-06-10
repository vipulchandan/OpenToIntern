const express = require('express');
const router = express.Router();

const { createCollege, getCollege } = require('../controllers/collegeController');
const { createIntern } = require('../controllers/internController');

router.get('/', (req, res) => {
    res.send('Welcome To Open To Intern Project!');
});

router.post('/functionup/colleges', createCollege)
router.post('/functionup/interns', createIntern)
router.get('/functionup/collegeDetails', getCollege)

module.exports = router;