import React, { useState } from "react";
import { auth } from "./services/firebase";
import { getCoupleRef } from "./services/auth";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import SearchBar from "./components/SearchBar";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user != null && getCoupleRef(user.email)) {
      setUser(user);
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return (
    <div className="App container">
      <h1>John🐘Search</h1>
      <SearchBar />
      {user !== null && !loading && <Dashboard user={user} />}
      {!user && !loading && <Signin />}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
