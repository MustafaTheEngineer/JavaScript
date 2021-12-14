const StorageController = (function () {

    const getRecords = () => {
        if (localStorage.length <= 1) {
            localStorage.setItem("total", 0);
            return [];
        } else {
            return JSON.parse(localStorage.getItem("records"));
        }
    }

    const newRecord = (records, name, value) => {
        records.push([name, value]);
        localStorage.setItem("records", JSON.stringify(records));
        return records.length - 1;
    }

    const saveRecord = records => {
        localStorage.setItem("records", JSON.stringify(records));
    }

    return {
        getRecords,
        newRecord,
        saveRecord
    }
})();

const ProductController = (function () {

    const control = (name, value) => {
        if (name === "" || value === "") {
            UIContoller.ShowError("Please enter all informations.");
            return 0;
        } else if (Number.isNaN(parseInt(value))) {
            UIContoller.ShowError("Please enter just number in price section.");
            return 0;
        } else
            return 1;

    }

    const changeTotal = (value) => {
        localStorage.setItem("total", parseInt(localStorage.getItem("total")) + value);
        UIContoller.updateTotal(localStorage.getItem("total"));
    }

    const delHead = records => {
        records.shift();
        StorageController.saveRecord(records);
    }

    const delTail = records => {
        records.pop();
        StorageController.saveRecord(records);
    }

    const delMid = (records, index) => {
        records.splice(index, 1);
        StorageController.saveRecord(records);
    }

    return {
        control,
        changeTotal,
        delHead,
        delTail,
        delMid
    }
})();

const UIContoller = (function () {

    var currentSettings = null;

    const AddLabel = (name, value, index, records) => {

        let productList = document.getElementById("product-list");
        if (productList === null) {
            main = document.querySelector("main");
            productList = document.createElement("div");
            total = document.getElementById("total");
            productList.id = "product-list";
            productList.innerHTML = `<ul id="product-ul"></ul>`
            main.insertBefore(productList, total);
            AddNode(name, value, index, records);

        } else
            AddNode(name, value, index, records);
    }

    const AddNode = (name, value, index, records) => {
        productList = document.getElementById("product-ul");
        node = document.createElement("li");

        productList.appendChild(node);
        node.innerHTML = `
        <ul>
            <li class="index">${index + 1}</li>
            <li class="product-name">${name}</li>
            <li class="product-value">${value} $</li>
            <li class="set-icon"><img src="svg/icons8-settings.svg"></li>
        </ul>`

        const copyNode = node;
        const settings = copyNode.querySelector("ul .set-icon");

        settings.addEventListener("click", () => {
            var control = (copyNode.getElementsByTagName("div")[0] !== currentSettings);
            var previousPrice = copyNode.children[0].children[2].textContent;
            previousPrice = parseInt(previousPrice.substring(0,previousPrice.length -1));
           
            if (control) {
                if (currentSettings != null)
                    currentSettings.remove();
                const addPriceInput = settings.previousElementSibling;
                const addNameInput = addPriceInput.previousElementSibling;

                addNameInput.innerHTML = `<input type="text" value=${addNameInput.textContent}>`;
                addPriceInput.innerHTML = `<input type="text" style="width: 100px;" value=${addPriceInput.textContent}>`;

                if (copyNode.querySelector(".set-buttons") === null) {
                    const setButtons = document.createElement("div");
                    setButtons.className = "set-buttons";
                    setButtons.innerHTML = `
                <button id="saveChanges">Save Changes</button>
                <button id="delete">Delete</button>
                <button id="cancel">Cancel</button>
                `;

                    copyNode.appendChild(setButtons);
                    currentSettings = setButtons;

                    document.getElementById("saveChanges").addEventListener("click", () => {
                        let newName = addNameInput.getElementsByTagName("input")[0].value;
                        let newPrice = addPriceInput.getElementsByTagName("input")[0].value;

                        if (ProductController.control(newName, newPrice)) {
                            copyNode.querySelector("div").remove();

                            copyNode.firstElementChild.children[1].textContent = newName;
                            copyNode.firstElementChild.children[2].textContent = newPrice + " $";
                            let currentIndex = parseInt(copyNode.getElementsByClassName("index")[0].textContent) - 1;
                            records[currentIndex] = [newName, newPrice];
                            StorageController.saveRecord(records);
                            ProductController.changeTotal(parseInt(newPrice) - previousPrice);
                        }
                    });

                    document.getElementById("delete").addEventListener("click", () => {
                        let delIndex = parseInt(copyNode.getElementsByClassName("index")[0].textContent) - 1;
                        ProductController.changeTotal(-parseInt(value));
                        if (delIndex === 0)
                            ProductController.delHead(records);
                        else if (delIndex === (records.length - 1))
                            ProductController.delTail(records);
                        else
                            ProductController.delMid(records, index);

                        const indexes = copyNode.parentElement.getElementsByClassName("index");
                        copyNode.remove();

                        setIndex(indexes, parseInt(copyNode.getElementsByClassName("index")[0].textContent) - 1, records.length);
                    });
                    document.getElementById("cancel").addEventListener("click", () => {
                        copyNode.querySelector("div").remove();
                        copyNode.firstElementChild.children[1].textContent = name;
                        copyNode.firstElementChild.children[2].textContent = value + " $";
                    });
                }
            }
        });
    }

    const setIndex = (indexes, elementIndex, recLength) => {
        for (let i = elementIndex; i < recLength; ++i) {
            indexes[i].textContent = parseInt(indexes[i].textContent) - 1;
        }
    }

    const initRecords = (records) => {
        for (let i = 0; i < records.length; ++i)
            AddLabel(records[i][0], records[i][1], i, records);

        updateTotal(localStorage.getItem("total"));
    }

    const updateTotal = value => {
        document.getElementById("total-dollar").textContent = value;
        document.getElementById("total-tl").textContent = value * 10;
    }

    const ShowError = (msg) => {
        isThere = document.getElementById("errorFrame");
        if (isThere === null) {
            let errorFrame = document.createElement("div");
            errorFrame.id = "errorFrame";
            let script = document.querySelector("script");
            const errMsg = document.createTextNode(msg);
            errorFrame.appendChild(errMsg);

            errorFrame.style.cssText = "position: absolute; \
            top: 130px; \
            right: 160px; \
            padding: 10px; \
            border-radius: 5px; \
            color: #fff; \
            background-color: red;"

            document.body.insertBefore(errorFrame, script);
        } else {
            let errorFrame = document.getElementById("errorFrame");
            errorFrame.innerText = msg;
            errorFrame.style.display = "inherit";
        }

        setTimeout(() => {
            errorFrame.style.display = "none";
        }, 2000)
    }

    return {
        AddLabel,
        initRecords,
        ShowError,
        updateTotal
    }
})();

const App = (function (ProductCtrl, UICtrl, StorageCtrl) {
    var productName = document.getElementById("nameInput");
    var price = document.getElementById("priceInput");
    var button = document.getElementById("addButton");

    function addButtonMethod(records) {
        let name = productName.value;
        let value = price.value;

        controlValue = ProductCtrl.control(name, value);
        if (controlValue) {
            let index = StorageCtrl.newRecord(records, name, value);
            UICtrl.AddLabel(name, value, index, records);
            ProductCtrl.changeTotal(parseInt(value));
        }
    }

    const init = () => {
        var records = StorageCtrl.getRecords();

        if (records !== null)
            UIContoller.initRecords(records);

        productName.addEventListener("keyup", btn => {
            if (btn.key === "Enter")
                price.focus();
        });

        price.addEventListener("keyup", btn => {
            if (btn.key === "Enter") {
                addButtonMethod(records);
                productName.value = "";
                price.value = "";
                productName.focus();
            }

        });

        button.addEventListener("click", () => {
            addButtonMethod(records);
        });
    }

    return {
        init,
    }
})(ProductController, UIContoller, StorageController);




App.init();