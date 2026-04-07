import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// SIGNUP
async function signup() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    await addDoc(collection(db, "users"), {
        username: username,
        password: password
    });

    alert("Signup successful ✅");
    window.location.href = "login.html";
}
// LOGIN
async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let querySnapshot = await getDocs(collection(db, "users"));

    let found = false;

    querySnapshot.forEach((doc) => {
        let user = doc.data();

        if (user.username === username && user.password === password) {
            found = true;
        }
    });

    if (found) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful ✅");
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials ❌");
    }
}
window.signup = signup;
window.login = login;