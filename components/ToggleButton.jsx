import React from 'react';

const ToggleButton = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 ${
        isOn ? 'bg-white' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-300 ${
          isOn ? 'transform translate-x-6 bg-black' : 'bg-white'
        }`}
      />
    </div>
  );
};

export default ToggleButton;
