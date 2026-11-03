import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
    }
  }
`;

function Question5() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) {
    return <h3>Loading countries...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <div>
      <h2>Question 5: Countries List</h2>

      {data.countries.map((country, index) => (
        <p key={index}>{country.name}</p>
      ))}
    </div>
  );
}

export default Question5;