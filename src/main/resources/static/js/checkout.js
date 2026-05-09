document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("checkoutForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        const userId = localStorage.getItem("userId");

        const data = {
            customerName: document.getElementById("customerName").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value
        };

        fetch(`/api/orders/place/${userId}`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        })

        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })

        .then(() => {
            alert("Order placed successfully!");
            window.location.href = "/my-orders";
        })

        .catch(() => {
            alert("Order failed");
        });

    });

});


// TOAST
function showToast(message, type = "success") {

    const toastEl =
        document.getElementById("liveToast");

    const toastMsg =
        document.getElementById("toastMsg");

    toastEl.classList.remove(
        "bg-success",
        "bg-danger"
    );

    if(type === "success") {
        toastEl.classList.add("bg-success");
    }

    if(type === "error") {
        toastEl.classList.add("bg-danger");
    }

    toastMsg.innerText = message;

    const toast =
        new bootstrap.Toast(toastEl);

    toast.show();
}