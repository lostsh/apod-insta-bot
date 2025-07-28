document.addEventListener("DOMContentLoaded", async (event) => {
    console.log("Linker ready");

    var tileContainer = document.getElementById("ns-grid");

    const observer = new MutationObserver((muts, obs) => {
        for (const mutat of muts) {
            if (mutat.type == "childList") {
                mutat.addedNodes[0].addEventListener("click", ev => {
                    //console.log(ev.currentTarget.getAttribute("hdurl"));
                    update_poster_values(ev.currentTarget);
                });
            }
        }
    });

    observer.observe(tileContainer, { attributes: true, childList: true, subtree: true });
    //observer.disconnect();
});

function update_poster_values(apodTile){
    const display_url = document.getElementById("picurl");
    const display_caption = document.getElementById("caption");

    display_url.setAttribute("value", apodTile.getAttribute("hdurl"));
    display_caption.textContent = (apodTile.getAttribute("title")
        +"\n"+apodTile.getAttribute("explanation"));
}