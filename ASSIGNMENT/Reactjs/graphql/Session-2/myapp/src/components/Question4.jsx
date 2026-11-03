function Question4() {
  return (
    <div>
      <h2>Question 4: Role of ApolloProvider</h2>

      <p>
        ApolloProvider is used to provide the Apollo Client
        to all components in a React application.
      </p>

      <p>
        It uses React Context to share the Apollo Client
        instance throughout the component tree.
      </p>

      <p>
        Child components can use hooks like useQuery
        and useMutation without importing the client
        separately.
      </p>
    </div>
  );
}

export default Question4;