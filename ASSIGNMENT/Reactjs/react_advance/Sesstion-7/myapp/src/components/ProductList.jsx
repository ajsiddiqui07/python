
import { useMemo, useState } from "react";
import products from "../data/products";

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return products.filter((product) =>
      product.name.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  return (
    <section className="product-section">
      <h2>Product List</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="product-search"
      />

      <p>
        Showing {filteredProducts.length} of {products.length} products
      </p>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
            />

            <div className="product-info">
              <h3>{product.name}</h3>

              <p className="product-price">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
