function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.zIndex = "9999";

    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "8px";
    toast.style.color = "white";
    toast.style.fontWeight = "500";
    toast.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
    toast.style.transition = "0.3s";

    if (type === "success") {
        toast.style.background = "#28a745";
    } else if (type === "error") {
        toast.style.background = "#dc3545";
    } else {
        toast.style.background = "#333";
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
    }, 2000);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}