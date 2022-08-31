let dataArray = [];
let keys = Object.keys(localStorage);
for(let key of keys) {
    if (key.startsWith("submitData")) {
        dataArray.push(localStorage.getItem(key));
    }
}

// Note: The latest card (which is supposed to be at the top on history page) is at index[0] of dataArray
dataArray.forEach((data, index) => {
    let submitData = data.split("&");
    let firstName = submitData[0];
    let lastName = submitData[1];
    let email = submitData[2];
    let phone = submitData[3];
    let company = submitData[4];
    let address = submitData[5];

    // Pushing HTML
    document.body.insertAdjacentHTML("beforeend", "<div class=\"submit-history-card\">\n" +
        "        <p class=\"field-name\">First Name</p>\n" +
        "        <p class=\"card-first-name field-value\"></p>\n" +
        "\n" +
        "        <p class=\"field-name\">Last Name</p>\n" +
        "        <p class=\"card-last-name field-value\"></p>\n" +
        "\n" +
        "        <p class=\"field-name\">Email</p>\n" +
        "        <p class=\"card-email field-value\"></p>\n" +
        "\n" +
        "        <p class=\"field-name\">Phone</p>\n" +
        "        <p class=\"card-phone field-value\"></p>\n" +
        "\n" +
        "        <p class=\"field-name\">Company</p>\n" +
        "        <p class=\"card-company field-value\"></p>\n" +
        "\n" +
        "        <p class=\"field-name\">Address</p>\n" +
        "        <p class=\"card-address field-value\"></p>\n" +
        "\n" +
        "        <button class=\"delete-button\">Delete</button>\n" +
        "    </div>");

    document.querySelectorAll(".card-first-name")[index].innerHTML = firstName;
    document.querySelectorAll(".card-last-name")[index].innerHTML = lastName;
    document.querySelectorAll(".card-email")[index].innerHTML = email;
    document.querySelectorAll(".card-phone")[index].innerHTML = phone;
    document.querySelectorAll(".card-company")[index].innerHTML = company;
    document.querySelectorAll(".card-address")[index].innerHTML = address;

    // Setting a custom attribute card-num to the card div
    // To be used in deleting card and related data from localStorage
    // Note: The latest card (which is supposed to be at the top on history page) is at index[0] of dataArray
    document.body.lastElementChild.setAttribute("card-num", String(dataArray.length - index));
});

let deleteButtonArray = document.querySelectorAll(".delete-button");
deleteButtonArray.forEach(function(element, index) {
    element.addEventListener("click", function() {
        let cardNum = element.parentElement.getAttribute("card-num");
        localStorage.removeItem(`submitData${cardNum}`);
        dataArray.splice(index, 1);
        element.parentElement.remove();

        // Correcting the order of `submitData${}` key in localStorage after card deletion
        // Cloning dataArray
        let copyDataArray = [...dataArray];
        console.log(copyDataArray);
        // copyDataArray is in decreasing order of `submitData${}` key
        // So, reversing it
        copyDataArray.reverse();
        localStorage.clear();
        copyDataArray.forEach(function (data, index) {
            localStorage.setItem(`submitData${index + 1}`, data);
        });

        location.reload();
    })
});






