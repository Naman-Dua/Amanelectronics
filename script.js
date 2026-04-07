import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
async function loadCart() {
    let user = localStorage.getItem("loggedInUser");

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
    loadCart(); // refresh UI
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
window.removeItem = removeItem;