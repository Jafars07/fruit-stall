document.addEventListener("DOMContentLoaded", loadOrders);

function loadOrders() {

    const userId = localStorage.getItem("userId");

    if (!userId || userId === "null") {
        alert("Please login first");
        window.location.href = "/login";
        return;
    }

    fetch(`/api/orders/user/${userId}`)
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("ordersContainer");
            container.innerHTML = "";

            if (!data || data.length === 0) {
                container.innerHTML = "<h5>No orders found</h5>";
                return;
            }

            data.forEach(order => {

                container.innerHTML += `
                    <div class="card order-card shadow-sm p-3 mb-3">

                        <div class="d-flex justify-content-between">
                            <h5>Order #${order.id}</h5>
                            <span class="badge bg-success">${order.status}</span>
                        </div>

                        <p class="text-muted mb-1">
                            ${order.orderDate || "N/A"} • ${order.orderTime || ""}
                        </p>

                        <div class="d-flex justify-content-between align-items-center mt-2">

                            <h6 class="mb-0">₹${order.totalAmount}</h6>

                            <button class="btn btn-primary btn-sm"
                                onclick="viewOrder(${order.id})">
                                View Items
                            </button>

                        </div>

                    </div>
                `;
            });
        })
        .catch(err => console.log(err));
}

// 🔍 VIEW ITEMS
function viewOrder(orderId) {
    window.location.href = `/Order-Details?orderId=${orderId}`;
}

// 🔓 LOGOUT
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "/login";
}