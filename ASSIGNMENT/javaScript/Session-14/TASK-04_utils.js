export function formatPrice(price) {
    return `₹${price.toFixed(2)}`;
}

export function getDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}