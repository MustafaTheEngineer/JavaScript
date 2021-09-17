const images = ["img/bmw.jpg", "img/honda.jpg", "img/mazda.jpg", "img/skoda.jpg", "img/volvo.jpg"];
const names = ["Bmw 418d", "Honda Civic", "Mazda CX-3", "Skoda Superb", "Volvo S60"]
const link = document.querySelector("img");
const header = document.querySelector("h4");
var count = 0;
var interval;
const next = document.getElementById("next");
const previous = document.getElementById("previous");

const toNext = function () {
    ++count;
    if (count >= images.length)
        count = 0;
    passing(count);
}

const toPrevious = function () {
    --count;
    if (count < 0)
        count = images.length - 1;
    passing(count);
}

const passing = function (count) {
    link.setAttribute("src", images[count]);
    header.textContent = names[count];
}

const otoSlide = function () {
    interval = setInterval(function () {
        toNext(); 
    }, 2000);
}

document.querySelectorAll("button").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
        clearInterval(interval); 
    });
    item.addEventListener("mouseleave", function () {
        otoSlide();
    });
});

next.addEventListener("click", toNext);
previous.addEventListener("click", toPrevious);

otoSlide();