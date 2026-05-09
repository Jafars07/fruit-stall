document.addEventListener("DOMContentLoaded", loadOrderItems);

function loadOrderItems() {

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    if (!orderId) {
        alert("Invalid order");
        return;
    }

    fetch(`/api/order-items/${orderId}`)
        .then(res => res.json())
        .then(items => {

            const container = document.getElementById("orderItems");
            container.innerHTML = "";

            let total = 0;

            if (!items || items.length === 0) {
                container.innerHTML = "<h5>No items found</h5>";
                return;
            }

            items.forEach(item => {

                total += (item.price * item.quantity);

                container.innerHTML += `
                    <div class="card mb-2 p-2">
                        <h5>${item.name}</h5>
                        <p>₹${item.price} x ${item.quantity}</p>
                    </div>
                `;
            });

            document.getElementById("orderTotal").innerText = total;
        })
        .catch(err => console.error("Order items error:", err));
}