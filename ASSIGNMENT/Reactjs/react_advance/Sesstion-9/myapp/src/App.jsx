import firebaseApp from "/firebase";

function App() {
  console.log("Firebase initialized successfully:", firebaseApp);

  return (
    <div>
      <h1>InstaThemeDemo</h1>
      <p>Firebase integration test</p>
    </div>
  );
}

export default App;