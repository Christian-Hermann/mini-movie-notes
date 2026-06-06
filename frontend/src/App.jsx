import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Mini Movie Notes</h1>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>Add One</button>
    </main>
  );
}

export default App;
