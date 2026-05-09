document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = {   // ✅ NOW user is defined properly
        username: username,
        password: password
    };

    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Invalid login");
        }
        return res.json();
    })
    .then(data => {

        console.log("LOGIN RESPONSE:", data);

        localStorage.setItem("userId", data.id);
        localStorage.setItem("role", data.role);

        showToast("Login successful!", "success");

        if (data.role === "ADMIN") {
            window.location.href = "/admin";
        } else {
            window.location.href = "/products";
        }

    })
    .catch(err => {
        console.log(err);
        showToast("Invalid username or password", "error");
    });
});
//Password eye
function togglePassword(id) {

    const input = document.getElementById(id);
    const icon = input.parentElement.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}