function DealsPage() {
  return (
    <div className="page">
      <h1>Today's Best Deals</h1>
      <p>Explore exciting offers and discounts.</p>

      <div className="product-card">
        <h3>Wireless Headphones</h3>
        <p>Price: ₹999</p>
        <p className="discount">Special Deal Available!</p>
      </div>

      <div className="product-card">
        <h3>Smart Watch</h3>
        <p>Price: ₹1,499</p>
        <p className="discount">Special Deal Available!</p>
      </div>
    </div>
  );
}

export default DealsPage;