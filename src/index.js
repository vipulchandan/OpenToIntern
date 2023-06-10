const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const route = require('./routes/route');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log(error.message);
});

app.use('/', route);

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${PORT}`);
});