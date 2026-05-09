document.addEventListener("DOMContentLoaded", loadOrderItems);

function loadOrderItems() {

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    if (!orderId) {
        alert("Invalid order");
        return;
    }

    fetch(`/api/orders/items/${orderId}`)
        .then(res => res.json())
        .then(items => {

            const container = document.getElementById("orderItems");
            const totalEl = document.getElementById("orderTotal");

            container.innerHTML = "";

            let total = 0;

            if (!items || items.length === 0) {
                container.innerHTML = "<h5>No items found</h5>";
                totalEl.innerText = 0;
                return;
            }

            items.forEach(item => {

                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                container.innerHTML += `
                    <div class="col-md-6">

                        <div class="card order-card p-3">

                            <div class="d-flex gap-3 align-items-center">

                                <img src="https://via.placeholder.com/80"
                                     class="product-img">

                                <div class="flex-grow-1">

                                    <h5 class="fw-bold mb-1">
                                        ${item.name}
                                    </h5>

                                    <p class="text-muted mb-2">
                                        ₹${item.price} × ${item.quantity}
                                    </p>

                                    <div class="d-flex justify-content-between">

                                        <span class="qty-badge">
                                            Qty: ${item.quantity}
                                        </span>

                                        <h5 class="price mb-0">
                                            ₹${itemTotal}
                                        </h5>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                `;
            });

            // ✅ THIS IS IMPORTANT
            totalEl.innerText = total;

        })
        .catch(err => {
            console.log(err);
        });
}

// BACK BUTTON
function goBack() {
    window.history.back();
}