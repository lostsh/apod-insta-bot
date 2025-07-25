document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  document.querySelector("button").addEventListener("click", async (ev) => {
    ev.preventDefault();
    
    const picurl = document.querySelector("#picurl").value;
    const caption = document.querySelector("#caption").value;
    const token =  document.querySelector("#token").value;

    // Send request
    const url = "http://localhost:8080/publish"
    + "?picurl="+picurl+"&caption="+caption;
    const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({token: token})
    })
    .then(response => response.json());

    console.log(res);

    var status = "Publication status: ";
    status += ("error" in res)? JSON.stringify(res):res.id;
    document.querySelector("#result").textContent = status;
  });
});


