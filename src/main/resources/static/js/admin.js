let allProducts = [];


// IMAGE PREVIEW
const imageInput = document.getElementById("imageFile");
const previewImage = document.getElementById("previewImage");

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {
        previewImage.src = URL.createObjectURL(file);
    }
});


// LOAD PRODUCTS
function loadProducts() {

    fetch("/api/products/all")
        .then(res => res.json())
        .then(data => {

            allProducts = data;

            renderProducts(data);

            updateDashboard(data);
        });
}


// RENDER PRODUCTS
function renderProducts(products) {

    const table = document.getElementById("productTable");

    table.innerHTML = "";

    products.forEach(p => {

        table.innerHTML += `
        <tr>

            <td>${p.id}</td>

            <td>
			<img src="${p.imageUrl}"
			     class="table-img"
			     onerror="this.onerror=null;this.src='/images/no-image.png'">
            </td>

            <td>${p.name}</td>

            <td>₹${p.price}</td>

            <td>${p.unit}</td>

            <td>
                ${p.available
                    ? `<span class="badge bg-success">Available</span>`
                    : `<span class="badge bg-danger">Out Of Stock</span>`}
            </td>

            <td>

                <button class="btn btn-warning btn-sm me-2"
                        onclick="editProduct(${p.id})">

                    Edit

                </button>

                <button class="btn btn-danger btn-sm"
                        onclick="deleteProduct(${p.id})">

                    Delete

                </button>

            </td>

        </tr>
        `;
    });
}


// DASHBOARD COUNTS
function updateDashboard(products) {

    document.getElementById("totalProducts").innerText =
        products.length;

    document.getElementById("availableProducts").innerText =
        products.filter(p => p.available).length;

    document.getElementById("unavailableProducts").innerText =
        products.filter(p => !p.available).length;
}


// SEARCH
function filterProducts() {

    const search =
        document.getElementById("searchBox")
        .value
        .toLowerCase();

    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(search)
    );

    renderProducts(filtered);
}


// ADD / UPDATE PRODUCT
document.getElementById("productForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const saveBtn = document.getElementById("saveBtn");

    saveBtn.disabled = true;

    saveBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Saving...
    `;

    const formData = new FormData();

    formData.append(
        "name",
        document.getElementById("name").value
    );

    formData.append(
        "price",
        document.getElementById("price").value
    );

    formData.append(
        "unit",
        document.getElementById("unit").value
    );

    formData.append(
        "available",
        document.getElementById("available").checked
    );

    const imageFile =
        document.getElementById("imageFile").files[0];

    if(imageFile) {
        formData.append("imageFile", imageFile);
    }

    let url = "/api/products";
    let method = "POST";

    if(window.editId) {

        url = `/api/products/${window.editId}`;

        method = "PUT";
    }

    fetch(url, {

        method: method,

        body: formData
    })

    .then(res => {

        if(!res.ok) {
            throw new Error("Save failed");
        }

        return res.json();
    })

    .then(() => {

        document.getElementById("msg").innerHTML =
            `<span class="text-success fw-bold">
                Product Saved Successfully!
             </span>`;

        document.getElementById("productForm").reset();

        previewImage.src =
		    "/images/no-image.png";

        window.editId = null;

        loadProducts();
    })

    .catch(() => {

        document.getElementById("msg").innerHTML =
            `<span class="text-danger fw-bold">
                Upload Failed
             </span>`;
    })

    .finally(() => {

        saveBtn.disabled = false;

        saveBtn.innerHTML = "Save Product";
    });

});

// DELETE PRODUCT
function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    fetch(`/api/products/${id}`, {
        method: "DELETE"
    })

    .then(() => {
        loadProducts();
    });
}


// EDIT PRODUCT
function editProduct(id) {

    fetch(`/api/products/${id}`)

        .then(res => res.json())

        .then(p => {

            document.getElementById("name").value =
                p.name;

            document.getElementById("price").value =
                p.price;

            document.getElementById("unit").value =
                p.unit;

            document.getElementById("available").checked =
                p.available;

            previewImage.src = p.imageUrl;

            window.editId = id;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
}


// INITIAL LOAD
loadProducts();