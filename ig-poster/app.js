const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.listen(port);

app.get('/', (req, res) => {
    res.send('<h1>Publishing API</h1><p>URL params: picurl & caption POST body (json): token</p>')
})

app.post('/publish', async (req, res) => {
    console.log(req.body)
    const token = req.body.token
    const pic_url = req.query.picurl;
    const caption = req.query.caption;

    // getting ig login
    var url = "https://graph.instagram.com/me?fields=user_id,username&access_token="+token;
    const ig_user_id = await fetch(url, {
        method: "GET",
        headers:{
            "User-Agent": "lostsh-requestor",
            "Content-Type": "text/json"
        }
    })
    .then(response => response.json())
    .then(response => response.user_id);

    // Publishing (phase1: creating post conatiner)
    url = "https://graph.instagram.com/"+(ig_user_id+"/media")
    +("?image_url="+pic_url+"&caption="+caption+"&access_token="+token);
    const container_id = await fetch(url, {
        method: "POST",
        headers:{
            "User-Agent": "lostsh-requestor",
            "Content-Type": "text/json"
        }
    })
    .then(response => response.json())
    .then(response => response.id);

    // Publishing (phase2: post conatiner)
    url = "https://graph.instagram.com/"
    +(ig_user_id+"/media_publish")
    +("?creation_id="+container_id+"&access_token="+token);
    const pub_status = await fetch(url, {
        method: "POST",
        headers:{
            "User-Agent": "lostsh-requestor",
            "Content-Type": "text/json"
        }
    })
    .then(response => response.json());


    res.send({
        'Publication status': pub_status
    })
})
