import React from 'react';

const EventTabs = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category 
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/30' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default EventTabs;