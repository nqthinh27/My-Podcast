// const path = require('path');
const port = 3001;
const express = require('express');
// const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

//Connect to db
db.connect();
dotenv.config();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('common'));

//ROUTES
app.use('/auth', require('./routes/authRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/post', require('./routes/postRouter'));
app.use('/comment', require('./routes/commentRouter'));
app.use('/history', require('./routes/historyRouter'));
app.use('/save', require('./routes/saveRouter'));
app.use('/like', require('./routes/likeRouter'));
app.use('/tag', require('./routes/tagRouter'));
app.use('/follow', require('./routes/followRouter'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});