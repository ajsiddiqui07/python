import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
    }
  }
`;

function Question3() {
  const { data } = useQuery(GET_COUNTRIES);

  return (
    <div>
      <h2>Question 3: Countries List</h2>

      {data &&
        data.countries.map((country, index) => (
          <p key={index}>{country.name}</p>
        ))}
    </div>
  );
}

export default Question3;