import TodoItemPage from './TodoItemPage';

function ToDoListPage({ todos, onDeleteToDo, onEditToDo }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoItemPage key={todo.id} todo={todo} onDeleteToDo={onDeleteToDo} onEditToDo={onEditToDo} />
      ))}
    </div>
  );
}

export default ToDoListPage;
