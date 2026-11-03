
const productTypes = [
  {
    name: "Wireless Headphones",
    price: 2499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    name: "Smart Watch",
    price: 3999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  },
  {
    name: "Running Shoes",
    price: 1999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    name: "Camera",
    price: 24999,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
  },
  {
    name: "Backpack",
    price: 1499,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
  },
];

const products = Array.from({ length: 1000 }, (_, index) => {
  const product = productTypes[index % productTypes.length];

  return {
    id: index + 1,
    name: `${product.name} ${index + 1}`,
    price: product.price + (index % 10) * 100,
    image: product.image,
  };
});

export default products;
