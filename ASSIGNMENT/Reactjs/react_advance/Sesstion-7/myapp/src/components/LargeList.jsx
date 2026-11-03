import { memo, useCallback, useMemo, useState } from "react";

const MemoizedProductRows = memo(function ProductRows({
  products,
  onSelect,
}) {
  console.log("ProductRows rendered");

  return (
    <div className="large-list">
      {products.map((product) => (
        <div className="large-list-row" key={product.id}>
          <span>{product.name}</span>

          <button
            type="button"
            onClick={() => onSelect(product.id)}
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
});

function LargeList() {
  const [count, setCount] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const products = useMemo(
    () =>
      Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
      })),
    []
  );

  const handleSelect = useCallback((productId) => {
    setSelectedId(productId);
  }, []);

  return (
    <section className="performance-card">
      <h2>Large List Performance Demo</h2>

      <p>Counter: {count}</p>

      <button
        type="button"
        onClick={() => setCount((previous) => previous + 1)}
      >
        Increase Counter
      </button>

      <p>
        Selected product: {selectedId ?? "None"}
      </p>

      <MemoizedProductRows
        products={products}
        onSelect={handleSelect}
      />
    </section>
  );
}

export default LargeList;