function Planet() {}

Planet.prototype.take = function (planetName) {
    var url;
    let control = 0;
    for (let i = 1; i <= 6; ++i) {
        url = "https://swapi.dev/api/planets/?page=" + i;
        var isThere = this.search(planetName, url).then(this.show).catch(() => {
            console.log("error");
        }); 
    } 
}

Planet.prototype.search = function (planetName, url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var ajax = new XMLHttpRequest();
            var control = 0;
            ajax.onload = function () {
                if (ajax.readyState === 4 && ajax.status === 200) {
                    var planets = JSON.parse(ajax.responseText).results;
                    for (var i = 0; i < planets.length; ++i) {
                        if (planets[i].name === planetName) {
                            control = 1;
                            break;
                        }
                    }
                    if (control)
                        resolve(planets[i]);
                    else
                        reject();
                }
            }
            ajax.open("GET", url);
            ajax.send();
        }); 
    });
}

Planet.prototype.show = function (value) {
    console.log(value);
}