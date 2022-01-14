// ################## Dont touch below ##################
const table = document.getElementById("thead-tr");

/*Example usage : var time = setFutureDate(2029,3,4)  --> month index starts with 1 (January -> 1) */
const setFutureDate = (year, monthIndex, day) => {
    return new Date(year, monthIndex - 1, day, 0, 0, 59);
}


// For background, upload an image
const setImage = (url) => {
    document.body.style.backgroundImage = `url(${url})`;
}

const setInfo = (year,desc) => {
    document.getElementById("year").textContent = year;
    document.getElementById("description").textContent = desc;
}

// ################## Dont touch above ##################

var futureDate = setFutureDate(2022, 4, 13);
setImage("ramadan.jpg");
setInfo(futureDate.getFullYear(),"Ramadan");

// ################## Dont touch below ##################

// Enormous function takes --> Date Object
setInterval(() => {
    var date = new Date();

    var restSeconds = Math.round((futureDate - date) / 1000);
    var restMinutes = restSeconds / 60;
    var restHours = restMinutes / 60;
    var restDay = Math.round(restHours / 24);

    timeList = [restDay, 24 - date.getHours(), 60 - date.getMinutes(), 59 - date.getSeconds()];

    for (let i = 0; i < 4; ++i)
        table.children[i].textContent = timeList[i];

}, 1000);