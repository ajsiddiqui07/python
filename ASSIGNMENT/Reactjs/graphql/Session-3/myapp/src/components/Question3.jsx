import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { productClient } from "../apiClients";
const GET_PRODUCTS = gql`
  query GetProducts {
    products(category: "electronics") {
      id
      title
      price
      inStock
    }
  }
`;

function Question3() {
 const { data, loading, error } = useQuery(GET_PRODUCTS, {
  client: productClient,
});

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div>
      <h2>Products</h2>

      {data.products.map((product) => (
        <div key={product.id}>
          <img
            src={product.image}
            alt={product.name}
            width="100"
          />

          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Question3;