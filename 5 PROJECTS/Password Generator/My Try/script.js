const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "\"!><\£+$'%&/{([)]=}?\\*-_,;#";

const button = document.getElementById("generate");
const upCase = document.getElementById("uppercase");
const lowCase = document.getElementById("lowercase");
const num = document.getElementById("numbers");
const symb = document.getElementById("symbols");
const length = document.getElementById("length");
const printPassword = document.getElementById("print-password");

button.addEventListener("click", () => {
    let password = generate();
    printPassword.textContent = password;
});

function generate() {
    let charList = getChars();
    let password = "";
    let charSet = charList[Math.floor(Math.random() * charList.length)];
    if (charList.length != 0) {
        for (let i = 0; i < length.valueAsNumber; ++i) {
            charSet = charList[Math.floor(Math.random() * charList.length)];
            password += charSet[Math.floor(Math.random() * charSet.length)];
        }
    }

    return password;
}

function getChars() {
    let charList = [];
    if (upCase.checked)
        charList.push(uppercase);
    if (lowCase.checked)
        charList.push(lowercase);
    if (num.checked)
        charList.push(numbers);
    if (symb.checked)
        charList.push(symbols);

    return charList;
}