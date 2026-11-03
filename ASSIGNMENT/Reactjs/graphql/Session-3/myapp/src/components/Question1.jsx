
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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

function Question1() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) {
    return <h2>Loading countries...</h2>;
  }

  if (error) {
    return <h2>GraphQL Error: {error.message}</h2>;
  }

  const countries = data?.countries ?? [];

  return (
    <div>
      <h1>Countries List</h1>

      {countries.map((country) => (
        <div key={country.code}>
          <h3>{country.name}</h3>
          <p>Capital: {country.capital || "N/A"}</p>
          <p>Currency: {country.currency || "N/A"}</p>
        </div>
      ))}
    </div>
  );
}

export default Question1;
