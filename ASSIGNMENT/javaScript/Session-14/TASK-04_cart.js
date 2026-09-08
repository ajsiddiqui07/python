import { formatPrice, getDiscountedPrice } from "./06_utils.js";

const items = [
    { name: "Item 1", price: 999, discount: 10 },
    { name: "Item 2", price: 1499, discount: 20 },
    { name: "Item 3", price: 2499, discount: 15 }
];

const cartDiv = document.getElementById("cart");

items.forEach(item => {

    const discountedPrice = getDiscountedPrice(item.price, item.discount);

    console.log(item.name);
    console.log("Original Price:", formatPrice(item.price));
    console.log("Discounted Price:", formatPrice(discountedPrice));

    cartDiv.innerHTML += `
        <div class="item">
            <h3>${item.name}</h3>
            <p>Original Price: ${formatPrice(item.price)}</p>
            <p>Discounted Price: ${formatPrice(discountedPrice)}</p>
            <hr>
        </div>
    `;
});