const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.listen(port);

app.get('/lasts', async (req, res) => {
    fs.readFile('./ns-secret.txt', 'utf-8', (err, token) => {
        if (err) throw err;
        load_nasa_pictures(req, res, token);
    });
})

async function load_nasa_pictures(req, res, token){
    const media_number = req.query.number || 5;

    const url = new URL("https://api.nasa.gov/planetary/apod");
    url.searchParams.append('api_key', token);

    // get the right number of days
    const end_date = new Date(Date.now());
    const start_date = new Date(end_date);
    start_date.setDate(end_date.getDate() - media_number);

    // add the timespan to query
    url.searchParams.append('end_date', end_date.toLocaleDateString('fr-CA'));
    url.searchParams.append('start_date', start_date.toLocaleDateString('fr-CA'));

    const nasa_apod = await fetch(url.href, {
        method: "GET",
        headers: {
            "User-Agent": "lostsh-requestor",
            "Content-Type": "text/json"
        }
    })
    .then(response => response.json());

    res.send(nasa_apod);
}