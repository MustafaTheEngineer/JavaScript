var count = 0;
const entry = document.getElementById("entry");
const entry_btn = document.getElementById("entry-btn");
const ul = document.querySelector("ul");
const deleteBtn = document.getElementById("delete-all");
const btnTag = "<button class=\"btn btn-secondary float-right\">x</button>";

const getInfos = function () {
    let temp;
    for (var i = 1; i <= localStorage.length; ++i) {
        temp = crNode(i);
        temp.innerHTML = localStorage[i] + btnTag;
        temp.children[0].addEventListener("click", remove);
        ul.append(temp);
    }
    count = i;
}


const deleteAll = function (item) {
    while (ul.lastElementChild) {
        ul.removeChild(ul.lastElementChild);
    }
    localStorage.clear();
}

const crNode = function (identity) {
    const add = document.createElement("li");
    add.setAttribute("class", "list-group-item bg-secondary text-light");
    add.setAttribute("id", "record" + (identity));

    return add;
}

const transfer = function () {
    const add = crNode(count);
    add.innerHTML = entry.value + btnTag;
    ul.appendChild(add);
    add.children[0].addEventListener("click", remove);
    localStorage.setItem(count.toString(), entry.value);
    ++count;
    entry.value = "";
}

const remove = function (item) {
    const decision = confirm("Are you sure?");
    if (decision) {
        const node = item.target.parentNode; 
        const idNmb = parseInt(node.id.slice(6));
        node.remove();
        for (let i = idNmb; i <= ul.childElementCount; ++i) {
            ul.children[i - 1].id = "record" + i;
            localStorage.setItem(i,localStorage.getItem(i+1));
        } 
        localStorage.removeItem(count-1);
        --count;
    }

}

const enter = function (key) {
    if (key.keyCode == 13) {
        transfer();
    }
}

getInfos();

entry_btn.addEventListener("click", transfer);
entry.addEventListener("keypress", enter);
deleteBtn.addEventListener("click", deleteAll);