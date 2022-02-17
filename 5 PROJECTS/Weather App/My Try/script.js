const input = document.getElementById("name");

const url = (location) => `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ab985929f9346d62a310e9ed410ce804/${location}?exclude=minutely,hourly,daily`;

async function getInfo(location){
    let info = await fetch(url(location)).then(() => {
        console.log(data);
    });
    console.log(info);
}

input.addEventListener("keyup",() => {
    getInfo("London");
});


