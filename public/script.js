let loading = function() {
    let load = document.querySelector(".loading");
    load.classList.toggle("invisible");
};

document.querySelector(".btn").addEventListener("click", async () => {
        
    let promptVal = document.querySelector('#inptPrompt').value;
    document.querySelector('#inptPrompt').value = "";
    

    var divEle = document.querySelector(".loading");
    divEle.before(`* ${promptVal}`);
    loading();
    var objDiv = document.querySelector(".output");
    objDiv.scrollTop = objDiv.scrollHeight;

    let options = {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            prompt: `${promptVal}`
        })
    }
    let response = await fetch("http://localhost:3000/", options);
    let data = await response.text();
    

    let inDiv = document.createElement('div');
    inDiv.innerHTML = `<pre class="bg-color">${data}</pre>`;
    loading();
    divEle.before(inDiv);

    objDiv.scrollTop = objDiv.scrollHeight;
})