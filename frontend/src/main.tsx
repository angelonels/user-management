import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Phase 1</p>
        <h1>User Registry</h1>
        <p className="summary">
          A simple user management assignment with a React frontend, Express
          backend, and MySQL database.
        </p>
        <div className="actions">
          <a href="http://localhost:4000/api/v1/health">Check API health</a>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

