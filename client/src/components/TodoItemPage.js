/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

function ToDoItem({ todo, onDeleteToDo, onEditToDo }) {
  return (
    <div className='flex justify-between items-center p-4 bg-white shadow rounded my-2'>
      <div className="flex flex-col">
        <div className="flex mb-2">
          {todo.tags.map(tag => (
            <span key={tag} className="bg-gray-300 px-2 py-1 rounded-full mr-2">{tag}</span>
          ))}
        </div>
        <div>
          <h5 className='text-lg font-bold'>{todo.title}</h5>
          <p>{todo.description}</p>
        </div>
        {todo.image && (
          <img src={todo.image} alt="ToDo Image" className="mt-2 w-24 h-24 object-cover rounded" />
        )}
      </div>
      <div>
        <button onClick={() => onEditToDo(todo)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2'>Edit</button>
        <button onClick={() => onDeleteToDo(todo.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>Delete</button>
      </div>
    </div>
  );
}

export default ToDoItem;
