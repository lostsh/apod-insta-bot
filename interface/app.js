const express = require('express');
const cors = require('cors');

const app = express();

const API_INSTA_POSTER = process.env.IGPOSTER || "http://localhost:8080";
app.use(cors({
    origin: [ API_INSTA_POSTER, 'http://localhost:3000']
}));

const port = 3000;

app.use(express.static('public'));
app.listen(port);