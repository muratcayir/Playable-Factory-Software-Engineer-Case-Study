import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser();
      getTodos();
    }
  }, []);

  const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/currentuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentUser(response.data.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:8080/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (todo) => {
    const token = localStorage.getItem("token")

    if (!token) return;

    try {
      const response = await axios.post("http://localhost:8080/todos", todo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteToDo = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8080/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/todos/${id}`,
        updatedTodo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data } : todo
        )
      );

      getTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const searchTodos = async (searchQuery) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/todos/search?keyword=${searchQuery}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error searching todos:", error);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        { email, password }
      );
      localStorage.setItem("token", response.data.userJwt);
      setCurrentUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signin",
        { email, password }
      );
      localStorage.setItem("token", response.data.userJwt);
      setCurrentUser(response.data.userJwt);
      return response.data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        todos,
        getTodos,
        addTodo,
        updateTodo,
        deleteToDo,
        signout,
        signin,
        signup,
        searchTodos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
