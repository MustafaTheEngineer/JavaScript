class Planet {
    constructor() {}

    take(planetName) {
        var url;
        let control = 0;
        var trueData;
        for (let i = 1; i <= 6; ++i) {
            url = "https://swapi.dev/api/planets/?page=" + i;
            control = this.search(url, planetName);
            if (control)
                break;
        }
    }
    async search(url, planetName) {
        await fetch(url).then(response => {
            return response.json();
        }).then(data => {
            for (let i = 0; i < 10; ++i) {
                if (data.results[i].name === planetName) {
                    this.show(data.results[i]);
                    return 1;
                }
            }
        }).catch(error => {
            console.log(error);
        });
    }

    show(data) {
        console.log(data);
    }
}