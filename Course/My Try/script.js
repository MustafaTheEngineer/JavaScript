const inputs = document.getElementById("entries").querySelectorAll("input");
const info = document.getElementById("info");
const tbody = document.getElementById("tbody");
var records = new Map();
var count = 0;

class Course {
    constructor(title, instructor, img) {
        this.title = title;
        this.instructor = instructor;
        this.img = img;
    }
}

function getRecords() {
    if (localStorage.length != 0) {
        for (let item = localStorage.length - 1; item >= 0; --item) {
            add(JSON.parse(localStorage.getItem(localStorage.key(item))));
            ++count;
        }
    }
}

function saveLocal(saveItem) {
    while (count === localStorage.key(count))
        console.log(++count);
    localStorage.setItem(count++, JSON.stringify(saveItem));
}

function add(course,idIndex) {
    let newCourse = document.createElement("tr");
    for (let i = 1; i <= 4; ++i) {
        let td = document.createElement("td");
        newCourse.appendChild(td);
    }
    let addImg = document.createElement("img");
    addImg.setAttribute("src", "img/" + course.img);
    newCourse.children[0].appendChild(addImg);

    newCourse.children[1].textContent = course.instructor;
    newCourse.children[2].textContent = course.title;

    let del = document.createElement("button");
    del.textContent = "Delete";
    del.setAttribute("class", "btn btn-danger btn-sm");
    del.id = count;
    newCourse.children[3].appendChild(del);

    del.addEventListener("click", () => {
        records.delete(parseInt(del.id));
        localStorage.removeItem(del.id);
        del.parentElement.parentElement.remove();
    });

    inputs.forEach((item) => {
        if (item !== inputs[3])
            item.value = "";
    });

    tbody.appendChild(newCourse);
    records.set(count, course);

    return records.get(count);
}

function getEmpty(blanks) {
    for (let i = 0; i < blanks.length - 1; ++i)
        blanks[i].value = "";
    blanks[0].focus();
}

function control() {
    let isFull = true;
    for (let i = 0; i < (inputs.length - 1); ++i) {
        if (inputs[i].value == "") {
            info.style.display = "block";
            info.classList.add("alert-warning");
            info.textContent = "Please complete the form ";
            isFull = false;
            setTimeout(() => {
                info.style.display = "none";
            }, 2000);

        }
    }
    if (isFull) {
        let create = new Course(inputs[0].value, inputs[1].value, inputs[2].value);
        saveLocal(add(create,count));
        getEmpty(inputs);
    }
}

for (let i = 0; i < inputs.length - 1; ++i) {
    if (inputs[i].id === "image") {
        inputs[i].addEventListener("keypress", (e) => {
            if (e.key === "Enter")
                control();
        });
    } else {
        inputs[i].addEventListener("keypress", (e) => {
            if (e.key === "Enter")
                inputs[i].nextElementSibling.focus();
        });
    }
};

inputs[inputs.length - 1].addEventListener("click", control);

getRecords();
getEmpty(inputs);