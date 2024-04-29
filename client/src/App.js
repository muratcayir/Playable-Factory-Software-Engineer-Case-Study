import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import TodoPage from "./components/TodoPage";
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/todos" element={<TodoPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
