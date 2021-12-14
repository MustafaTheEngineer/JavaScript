var input = document.getElementById("input01");
var planet = new Planet();

input.addEventListener("keyup", () => {
    planet.take(input.value);
});