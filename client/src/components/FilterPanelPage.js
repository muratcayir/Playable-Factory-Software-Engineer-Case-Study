import React, { useState } from 'react';

function FilterPanelPage({ tags, onFilterChange }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    const currentIndex = selectedTags.indexOf(tag);
    const newTags = [...selectedTags];

    if (currentIndex === -1) {
      newTags.push(tag);
    } else {
      newTags.splice(currentIndex, 1);
    }

    setSelectedTags(newTags);
    onFilterChange(newTags);
  };

  return (
    <div className='flex flex-wrap gap-2 p-4'>
      {tags.map(tag => (
        <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full text-white ${selectedTags.includes(tag) ? 'bg-blue-500' : 'bg-gray-300'}`}>
          {tag}
        </button>
      ))}
    </div>
  );
}

export default FilterPanelPage;
