import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./Question2.css";
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

function Question2() {
 const { data, loading, error } = useQuery(GET_PRODUCTS, {
  client: productClient,
});



  return (
    <div>
      <h2>Flipkart Product List</h2>

      <div className="product-container">
        {data?.products?.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              width="150"
            />

            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question2;