
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  document.querySelector("button").addEventListener("click", async (ev) => {
    ev.preventDefault();
    
    const picurl = document.querySelector("#picurl").value;
    const caption = document.querySelector("#caption").value;
    const token =  document.querySelector("#token").value;

    // Send request
    const url = "http://localhost:8000/publish" 
    + "?picurl="+picurl+"&caption="+caption;
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({token: token})
    })
    .then(response => response.json());

    document.querySelector("#result").textContent = res;
  });
});


