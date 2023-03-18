const path = require('path');
const port = 3001;
const express = require('express');
// const cors = require('cors');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const db = require('./config/db');

//Connect to db
db.connect();
dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
// app.use(cors);
app.use(morgan('common'));

//ROUTES
app.use('/auth', require('./routes/authRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/post', require('./routes/postRouter'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});