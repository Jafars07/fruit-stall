fetch("/api/products")
  .then(res => res.json())
  .then(products => {

    const container = document.getElementById("productList");
    container.innerHTML = "";

    products.forEach(p => {

      const availability = p.available 
        ? `<span class="badge bg-success">Available</span>`
        : `<span class="badge bg-danger">Out of Stock</span>`;

      const card = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card product-card h-100 shadow-sm">

            <!-- 🔥 IMAGE FIX (fallback + error handling) -->
            <img src="${p.imageUrl || `https://via.placeholder.com/200?text=${p.name}`}" 
                 class="card-img-top product-img" 
                 alt="${p.name}"
                 onerror="this.src='https://via.placeholder.com/200?text=Fruit'">

            <div class="card-body d-flex flex-column">

              <h5 class="card-title">${p.name}</h5>

              <p class="price">₹${p.price} / ${p.unit}</p>

			  <div class="mt-2 mb-2">
			      ${p.available 
			          ? `<span class="availability available">● Available</span>`
			          : `<span class="availability unavailable">● Not Available</span>`
			      }
			  </div>

			  <button class="btn btn-success btn-sm mt-auto w-100"
                onclick='addToCart(${JSON.stringify(p)})'>
                ${p.available ? "Add to Cart" : "Out of Stock"}
              </button>

            </div>
          </div>
        </div>
      `;

      container.innerHTML += card;
    });
  });


// 🔥 UPDATED ADD TO CART (TOAST + SAFETY)
function addToCart(product) {

    const userId = localStorage.getItem("userId");

    if (!userId || userId === "null") {
        showToast("Please login first", "warning");
        window.location.href = "/login";
        return;
    }

    fetch("/api/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: parseInt(userId),
            productId: product.id,
            quantity: 1
        })
    })
    .then(res => res.json())
    .then(() => {
        showToast(product.name + " added to cart!");
    })
    .catch(err => console.log(err));
}


// 🔥 TOAST FUNCTION (ADD THIS IF NOT ALREADY PRESENT)
function showToast(message, type = "success") {

    const toastEl = document.getElementById("liveToast");
    const toastMsg = document.getElementById("toastMsg");

    toastEl.classList.remove("bg-success", "bg-danger", "bg-warning");

    if (type === "success") toastEl.classList.add("bg-success");
    if (type === "error") toastEl.classList.add("bg-danger");
    if (type === "warning") toastEl.classList.add("bg-warning");

    toastMsg.innerText = message;

	const toast = new bootstrap.Toast(toastEl, {
	    delay: 2000,   // ⏱️ disappears after 2 sec
	    autohide: true
	});

	toast.show();

	// 🔥 force hide (extra safety)
	setTimeout(() => {
	    toast.hide();
	}, 2200);
}

//Search Bar
// 🔍 SEARCH PRODUCTS
function filterProducts() {

    const searchValue =
        document.getElementById("searchBox")
        .value
        .toLowerCase();

    const products =
        document.querySelectorAll("#productList > div");

    products.forEach(product => {

        const productName =
            product.querySelector(".card-title")
            .innerText
            .toLowerCase();

        if (productName.includes(searchValue)) {

            product.style.display = "";

        } else {

            product.style.display = "none";
        }
    });
}
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "/login";
}