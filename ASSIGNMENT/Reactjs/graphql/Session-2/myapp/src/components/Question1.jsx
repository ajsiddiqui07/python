import { ApolloClient } from "@apollo/client";

function Question1() {
  console.log("Apollo Client Installed:", ApolloClient);

  return (
    <div>
      <h2>Question 1</h2>
      <p>Apollo Client installation verified successfully.</p>
    </div>
  );
}

export default Question1;