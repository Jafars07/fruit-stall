document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {

    const userId = localStorage.getItem("userId");

    if (!userId || userId === "null") {
        alert("Please login first");
        window.location.href = "/login";
        return;
    }

    fetch(`/api/cart/user/${userId}`)
        .then(res => res.json())
        .then(data => {

            const cartDiv = document.getElementById("cartItems");
            const totalSpan = document.getElementById("totalPrice");

            cartDiv.innerHTML = "";
            let total = 0;

            if (!data || data.length === 0) {
                cartDiv.innerHTML = "<p>No items in cart</p>";
                totalSpan.innerText = 0;
                return;
            }

            data.forEach(item => {

                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                cartDiv.innerHTML += `
                    <div class="card cart-card shadow-sm p-3 mb-3">

                        <div class="d-flex justify-content-between">
                            <h5>${item.name}</h5>
                            <button class="btn btn-sm btn-danger"
                                onclick="removeItem(${item.id})">
                                Remove
                            </button>
                        </div>

                        <p class="text-muted mb-1">₹${item.price} per item</p>

                        <div class="d-flex justify-content-between align-items-center mt-2">

                            <div class="d-flex align-items-center gap-2 qty-box">

                                <button class="btn btn-sm btn-outline-danger"
                                    onclick="decreaseQty(${item.id})">−</button>

                                <span><b>${item.quantity}</b></span>

                                <button class="btn btn-sm btn-outline-success"
                                    onclick="increaseQty(${item.id})">+</button>

                            </div>

                            <h6>₹${itemTotal}</h6>

                        </div>

                    </div>
                `;
            });

            totalSpan.innerText = total;
        })
        .catch(err => console.log(err));
}

// ➕
function increaseQty(id) {
    fetch(`/api/cart/increase/${id}`, { method: "PUT" })
        .then(() => loadCart());
}

// ➖
function decreaseQty(id) {
    fetch(`/api/cart/decrease/${id}`, { method: "PUT" })
        .then(() => loadCart());
}

// ❌ remove
function removeItem(id) {
    fetch(`/api/cart/delete/${id}`, { method: "DELETE" })
        .then(() => loadCart());
}

// 🛒 checkout
function checkout() {

    window.location.href = "/checkout";
}

// 🔓 logout
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "/login";
}

//Message aftre submission for all pages
function showToast(message, type = "success") {

    const toastEl = document.getElementById("liveToast");
    const toastMsg = document.getElementById("toastMsg");

    // change color dynamically
    toastEl.classList.remove("bg-success", "bg-danger", "bg-warning");

    if (type === "success") toastEl.classList.add("bg-success");
    if (type === "error") toastEl.classList.add("bg-danger");
    if (type === "warning") toastEl.classList.add("bg-warning");

    toastMsg.innerText = message;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}