import getDiscountedPrice, { formatPrice } from "./09_utils.js";

const items = [
    { name: "headphone", price: 999, discount: 10 },
    { name: "Mobile", price: 1499, discount: 20 },
    { name: "mic", price: 2499, discount: 15 }
];

const cart = document.getElementById("cart");

items.forEach(item => {

    const discounted = getDiscountedPrice(item.price, item.discount);

    console.log(item.name);
    console.log("Original:", formatPrice(item.price));
    console.log("Discounted:", formatPrice(discounted));

    cart.innerHTML += `
        <div>
            <h3>${item.name}</h3>
            <p>Original Price: ${formatPrice(item.price)}</p>
            <p>Discounted Price: ${formatPrice(discounted)}</p>
            <hr>
        </div>
    `;
});