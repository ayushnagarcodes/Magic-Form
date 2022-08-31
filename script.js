let inputFirstName = document.getElementById("first-name");
let inputLastName = document.getElementById("last-name");
let inputEmail = document.getElementById("email");
let inputPhone = document.getElementById("phone");
let inputCompany = document.getElementById("company");
let inputAddress = document.getElementById("address");
let submitButton = document.getElementById("submit-button");
let inputElementArray = [inputFirstName, inputLastName, inputEmail, inputPhone, inputCompany, inputAddress];

function storeValue(event, key) {
    localStorage.setItem(key, event.target.value);
}

function getValue(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < localStorage.length; j++) {
            if (array[i].getAttribute("id") === localStorage.key(j)) {
                array[i].value = localStorage.getItem(localStorage.key(j));
            }
        }
    }
}

// Storing form data in localStorage
for (let i = 0; i < inputElementArray.length; i++) {
    inputElementArray[i].addEventListener("input", function(event) {
        storeValue(event, inputElementArray[i].getAttribute("id"));
    });
}

// Transferring data from localStorage to form
window.onload = (event) => {
    getValue(inputElementArray);
}

// Checking whether the data in the local storage is changed
// If so, updating the data in the form
window.onstorage = event => {
    getValue(inputElementArray);
};

// Storing form data collectively in localStorage when submit button is pressed
// Also, removing individual data from localStorage
document.getElementById("form").addEventListener("submit", (event) => {
    let submitData = [inputFirstName.value, inputLastName.value, inputEmail.value, inputPhone.value, inputCompany.value
        , inputAddress.value];

    let countSubmitDataRecord = 0;
    let keys = Object.keys(localStorage);
    for(let key of keys) {
        if (key.startsWith("submitData")) {
            countSubmitDataRecord++;
        } else {
            localStorage.removeItem(key);
        }
    }

    localStorage.setItem(`submitData${countSubmitDataRecord + 1}`, submitData.join("&"));
});
