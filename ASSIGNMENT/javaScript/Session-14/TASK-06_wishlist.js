import {
    addToWishlist,
    removeFromWishlist,
    getWishlist
} from "./012_wishlistUtils.js";

const nameInput = document.getElementById("itemName");
const priceInput = document.getElementById("itemPrice");
const wishlistDiv = document.getElementById("wishlist");

document.getElementById("addBtn").addEventListener("click", () => {

    const name = nameInput.value;
    const price = priceInput.value;

    if (!name || !price) return;

    addToWishlist({ name, price });

    renderWishlist();

    nameInput.value = "";
    priceInput.value = "";
});

function renderWishlist() {

    wishlistDiv.innerHTML = "";

    getWishlist().forEach(item => {
        wishlistDiv.innerHTML += `
            <div class="item">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="removeItem('${item.name}')">Remove</button>
            </div>
        `;
    });
}

// Make function global for button click
window.removeItem = function(name) {
    removeFromWishlist(name);
    renderWishlist();
};