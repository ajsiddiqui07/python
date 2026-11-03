
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { movieClient } from "../apiClients";

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
    }
  }
`;

function Question5() {
  const { loading, error, data } = useQuery(GET_MOVIES, {
    client: movieClient,
  });

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data?.movies) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {data.movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Question5;
