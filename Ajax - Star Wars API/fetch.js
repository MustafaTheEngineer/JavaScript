function Planet() {}

Planet.prototype.take = function (planetName) {
    var url;
    let control = 0;
    var trueData;
    for (let i = 1; i <= 6; ++i) {
        url = "https://swapi.dev/api/planets/?page=" + i;
        fetch(url).then(response => {
            return response.json();
            }).then(data => {
                for(let i=0 ; i< 10 ;++i){ 
                    if(data.results[i].name === planetName){
                        control = 1;
                        this.show(data.results[i]);
                        break;
                    }
                } 
            }).catch(error => {
                console.log(error);
            });
            if(control)
                break;
    }
}


Planet.prototype.show = function (value) {
    console.log(value);
}