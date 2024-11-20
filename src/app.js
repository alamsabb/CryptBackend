const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes= require('./routes/routes');
const app = express();
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
// }));
app.use(cors());
app.use(express.json({
    limit: '16kb'
}));
app.use(express.urlencoded({extended: true},limit='16kb'));

app.use(express.static('public'));
app.use(cookieParser());
app.use('/',routes);

module.exports = app;
