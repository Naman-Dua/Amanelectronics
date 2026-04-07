import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ADD TO CART
async function addToCart(name, price) {
    let user = localStorage.getItem("loggedInUser");

    if (!user) {
        alert("Login first 🔐");
        window.location.href = "login.html";
        return;
    }

    await addDoc(collection(db, "cart"), {
        username: user,
        name: name,
        price: price
    });

    alert("Added to cart 🛒");
}

// LOAD CART
async function loadCart() {
    let user = localStorage.getItem("loggedInUser");

    if (!user) {
        alert("Please login to view cart 🔐");
        window.location.href = "login.html";
        return;
    }

    let querySnapshot = await getDocs(collection(db, "cart"));

    let cartDiv = document.getElementById("cart-items");
    let total = 0;

    cartDiv.innerHTML = "";

    querySnapshot.forEach((d) => {
        let item = d.data();

        if (item.username === user) {
            total += item.price;

            cartDiv.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                    <button onclick="removeItem('${d.id}')">❌</button>
                </div>
            `;
        }
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// REMOVE ITEM
async function removeItem(id) {
    await deleteDoc(doc(db, "cart", id));
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

// Expose all functions to global scope so onclick works in HTML
window.addToCart = addToCart;
window.loadCart = loadCart;
window.removeItem = removeItem;
window.checkout = checkout;
window.closeModal = closeModal;
window.processPayment = processPayment;