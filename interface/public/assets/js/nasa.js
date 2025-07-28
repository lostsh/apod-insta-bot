document.addEventListener("DOMContentLoaded", async (event) => {
    console.log("DOM fully loaded and parsed");

    const grid = document.querySelector("#ns-grid");

    //const url = "http://localhost:8090/lasts";
    const url = "http://localhost:3000/apod.json";
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json());

    res.forEach(apod_item => {
        grid.appendChild(createApodItem(apod_item));
    });
});

function createApodItem(apod_item){
    var apodTile = document.createElement("apod-tile");
    for( var attribute in apod_item){
        apodTile.setAttribute(attribute, apod_item[attribute]);
    }
    return apodTile;
}

class apodtile extends HTMLElement{
    constructor(){ super(); }
    connectedCallback(){
        this.innerHTML = `
          <div class="tile">
            <h4>`+this.getAttribute('title')+`</h4>
            <img src="../" alt="apod pic">
            <p>`+this.getAttribute('explanation')+`</p>
            <span>`+this.getAttribute('date')+`</span>
          </div>
        `;
        this.children[0].style.backgroundImage = "url('"+this.getAttribute('url')+"')";
        //this.childNodes[0].style.backgroundImage = "url('"+this.getAttribute('url')+"')";
        this.children[0].style.backgroundSize = "cover";
    }
}
customElements.define('apod-tile', apodtile);