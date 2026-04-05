function addToCart(name, price) {
    let user = localStorage.getItem("loggedInUser");

    if (!user) {
        alert("Please login first 🔐");
        window.location.href = "login.html";
        return;
    }

    fetch("https://aman-render.onrender.com/add_to_cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user,
            name: name,
            price: price
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}
function loadCart() {
    let user = localStorage.getItem("loggedInUser");

    fetch("https://aman-render.onrender.com/get_cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: user })
    })
    .then(res => res.json())
    .then(cart => {
        let cartDiv = document.getElementById("cart-items");
        let total = 0;

        cartDiv.innerHTML = "";

        cart.forEach((item) => {
            total += item.price;

            cartDiv.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                </div>
            `;
        });

        document.getElementById("total").innerText = "Total: ₹" + total;
    });
}// REMOVE ITEM
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

// CHECKOUT
function checkout() {
    document.getElementById("payment-modal").style.display = "flex";
}
function closeModal() {
    document.getElementById("payment-modal").style.display = "none";
}

function processPayment() {
    let modal = document.querySelector(".modal-content");

    modal.innerHTML = "<h2>Processing Payment... ⏳</h2>";

    setTimeout(() => {
        modal.innerHTML = "<h2>Payment Successful ✅</h2>";

        localStorage.removeItem("cart");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    }, 2000);
}
