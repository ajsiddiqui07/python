import useFetchData from "../hooks/useFetchData";

function FlipkartProductList() {
  const {
    loading,
    data: products,
    error,
  } = useFetchData("https://fakestoreapi.com/products");

  return (
    <section className="product-section">
      <h2>🛍️ Product List</h2>

      <p className="subtitle">
        Sample products from Fake Store API
      </p>

      {loading && <p>Loading products...</p>}

      {error && (
        <p className="error">
          Unable to load products: {error}
        </p>
      )}

      {!loading && !error && products && (
        <div className="product-grid">
          {products.map((product) => (
            <article
              className="product-card"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.title}
              />

              <h3>{product.title}</h3>

              <p className="price">
                ${product.price.toFixed(2)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default FlipkartProductList;