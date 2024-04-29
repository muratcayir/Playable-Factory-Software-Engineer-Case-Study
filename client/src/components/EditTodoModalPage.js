import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';  

function EditToDoModal({ todo,onClose }) {
  const { updateTodo } = useAuth();  
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [tags, setTags] = useState(todo.tags ? todo.tags.join(', ') : '');

  const handleUpdate = () => {
    const updatedData = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''), 
    };
    updateTodo(todo.id, updatedData);
    onClose();
  };
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
    <div className='bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
      <h3 className='text-lg font-bold mb-4'>Edit ToDo</h3>
      <input className='border p-2 w-full mb-4' value={title} onChange={e => setTitle(e.target.value)} placeholder='Name' />
      <textarea className='border p-2 w-full mb-4' value={description} onChange={e => setDescription(e.target.value)} placeholder='Description' />
      <input className='border p-2 w-full mb-4' value={tags} onChange={e => setTags(e.target.value)} placeholder='Tags' />
      <div>      
        <button onClick={handleUpdate} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>Update</button>
        <button onClick={onClose} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
      </div>
    </div>
  </div>
  );
}

export default EditToDoModal;
