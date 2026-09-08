let wishlist = [];

export function addToWishlist(item) {
    wishlist.push(item);
}

export function removeFromWishlist(name) {
    wishlist = wishlist.filter(item => item.name !== name);
}

export function getWishlist() {
    return wishlist;
}