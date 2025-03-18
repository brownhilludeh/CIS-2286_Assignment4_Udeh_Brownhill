document.addEventListener("DOMContentLoaded", function () {

    //prevent form from submitting
    document.getElementById("orderForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
});