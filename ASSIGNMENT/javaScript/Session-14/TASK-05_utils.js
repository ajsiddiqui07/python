export function formatPrice(price) {
    return `₹${price.toFixed(2)}`;
}

export default function getDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}