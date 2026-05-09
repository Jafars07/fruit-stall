document.addEventListener("DOMContentLoaded", loadOrders);

function loadOrders() {

    fetch("/api/orders")
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("ordersContainer");
            container.innerHTML = "";

            if (!data || data.length === 0) {
                container.innerHTML = `
                    <div class="text-center text-muted">
                        <h5>No Orders Found</h5>
                    </div>
                `;
                return;
            }

            data.forEach(order => {

                const statusColor =
                    order.status === "DELIVERED"
                        ? "bg-success"
                        : order.status === "PLACED"
                        ? "bg-warning"
                        : "bg-primary";

                container.innerHTML += `

                <div class="col-lg-6 col-md-12">

                    <div class="card shadow-sm border-0 p-4">

                        <!-- HEADER -->
                        <div class="d-flex justify-content-between align-items-center">

                            <h5 class="fw-bold mb-0">
                                Order #${order.id}
                            </h5>

                            <span class="badge ${statusColor}">
                                ${order.status}
                            </span>

                        </div>

                        <hr>

                        <!-- CUSTOMER INFO -->
                        <p><i class="bi bi-person"></i> <b>${order.customerName || "N/A"}</b></p>

                        <p><i class="bi bi-telephone"></i> ${order.phone || "N/A"}</p>

                        <p><i class="bi bi-geo-alt"></i> ${order.address || "N/A"}</p>

                        <hr>

                        <!-- ORDER INFO -->
                        <p><b>Total:</b> ₹${order.totalAmount}</p>

                        <p class="text-muted">
                            ${order.orderDate} • ${order.orderTime}
                        </p>

                        <!-- ACTIONS -->
                        <div class="d-flex gap-2 mt-3">

                            <button class="btn btn-outline-primary w-50"
                                    onclick="viewItems(${order.id})">

                                View Items

                            </button>

                            <button class="btn btn-success w-50"
                                    onclick="markDelivered(${order.id})">

                                Mark Delivered

                            </button>

                        </div>

                    </div>

                </div>
                `;
            });
        })
        .catch(err => console.error(err));
}


// VIEW ITEMS
function viewItems(orderId) {
    window.location.href = `/Order-Details?orderId=${orderId}`;
}


// MARK DELIVERED
function markDelivered(orderId) {

    fetch(`/api/orders/delivered/${orderId}`, {
        method: "PUT"
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
    })
    .then(() => {
        loadOrders(); // refresh UI
    })
    .catch(err => {
        console.log(err);
        alert("Failed to update status");
    });
}