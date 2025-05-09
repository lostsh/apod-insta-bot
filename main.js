const { argv } = require('node:process');

async function main(nasa_token, insta_token){

    // fetching nasa data
    const nasa_apod = await fetch('https://api.nasa.gov/planetary/apod?api_key='+nasa_token, {
        method: "GET",
        headers:{
            "User-Agent": "lostsh-requestor",
            "Content-Type": "text/json"
        }
    })
    .then(response => response.json());

    // getting ig login
    var url = "https://graph.instagram.com/me?fields=user_id,username&access_token="+insta_token;
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
    const caption = (nasa_apod.title+" ("+nasa_apod.date+") "+nasa_apod.explanation);
    url = "https://graph.instagram.com/"
    +(ig_user_id+"/media")
    +("?image_url="+nasa_apod.hdurl+"&caption="+caption+"&access_token="+insta_token);
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
    +("?creation_id="+container_id+"&access_token="+insta_token);
    const pub_status = await fetch(url, {
        method: "POST",
        headers:{
            "User-Agent": "lostsh-requestor",
            "Content-Type": "text/json"
        }
    })
    .then(response => response.json());

    console.log(pub_status);
    if("error" in pub_status){
        return pub_status.error.code;
    }else{
       return 0;
    }
    // TODO add interface and outputs status
    // TODO add the hashtags (checkout nasa api sometimes generate hashtags)
}

main(process.argv[2], process.argv[3])
.then(code => process.exit(code));
