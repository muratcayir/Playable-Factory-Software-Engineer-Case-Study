import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddTodoPage from "./AddTodoPage";
import TodoListPage from "./TodoListPage";
import EditTodoModalPage from "./EditTodoModalPage";
import FilterPanelPage from "./FilterPanelPage";

function TodoPage() {
  const {
    todos,
    getTodos,
    addTodo,
    deleteToDo,
    updateTodo,
    searchTodos,
  } = useAuth();
  const [editingTodo, setEditingTodo] = useState(null);
  const [filteredTags, setFilteredTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getTodos();
    if (!token) {
      navigate("/signin");
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchTodos(searchQuery);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
  };

  const handleFilterChange = (selectedTags) => {
    setFilteredTags(selectedTags);
  };

  const filteredTodos = todos.filter(
    (todo) =>
      (filteredTags.length === 0 ||
        todo.tags.some((tag) => filteredTags.includes(tag))) &&
      (todo.title.toLowerCase().includes(searchQuery) ||
        todo.description.toLowerCase().includes(searchQuery))
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-end mr-3">
        <button
          onClick={auth.signout}
          className=" mb-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center justify-center"
      >
        <input
          type="text"
          placeholder="Search Todos..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
      </form>
      <div className="m-4">
      <h1 className="text-2xl font-bold mb-2">Todo Add</h1>
        <AddTodoPage onAddToDo={addTodo} />
      </div>

      <h1 className="text-2xl font-bold mb-2">Tags List and Filter</h1>  <FilterPanelPage
        tags={[...new Set(todos.flatMap((todo) => todo.tags))]}
        onFilterChange={handleFilterChange}
      />
       <h1 className="text-2xl font-bold mb-2">Todo List</h1>
      <TodoListPage
        todos={filteredTodos}
        onDeleteToDo={deleteToDo}
        onEditToDo={openEditModal}
      />
      {editingTodo && (
        <EditTodoModalPage
          todo={editingTodo}
          onUpdateToDo={updateTodo}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default TodoPage;
