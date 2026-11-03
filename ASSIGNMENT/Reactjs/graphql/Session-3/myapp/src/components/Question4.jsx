
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import { restaurantClient } from "../apiClients";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      currency
    }
  }
`;

function Question4() {
  const { data, loading, error } = useQuery(GET_COUNTRIES, {
    client: restaurantClient,
  });

  if (loading) return <p>Loading countries...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Country List</h2>

      {data?.countries?.map((country) => (
        <div key={country.code}>
          <h3>{country.name}</h3>
          <p>Capital: {country.capital || "Not available"}</p>
          <p>Currency: {country.currency || "Not available"}</p>
        </div>
      ))}
    </div>
  );
}

export default Question4;
