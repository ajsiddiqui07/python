import useFetchData from "../hooks/useFetchData";

function ProductList() {
  const apiUrl = "https://fakestoreapi.com/products";

  // Call the custom hook at the top level.
  const { data, loading, error } = useFetchData(apiUrl);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="card">
      <h2>Flipkart-Style Product Listing</h2>

      {!data || data.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {data.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />

              <h3>{product.title}</h3>

              <p className="price">
                ₹{product.price}
              </p>

              <p>
                Rating: {product.rating?.rate ?? "N/A"}
              </p>

              <button type="button">
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;