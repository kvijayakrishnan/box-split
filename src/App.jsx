import React, { useState } from 'react';
import './App.css';
// import App from './../../infinite-scroll/src/App';

const BoxSplit = () => {
  const [boxes, setBoxes] = useState([{ id: 1, parentId: null }]); // Root box with an initial ID

  const handleBoxClick = (id) => {
    setBoxes((prevBoxes) => {
      // Check if the box has already been split
      if (prevBoxes.some((box) => box.parentId === id)) {
        return prevBoxes; // No action needed
      }

      // Add four smaller boxes with the clicked box as their parent
      const newBoxes = Array.from({ length: 4 }, (_, index) => ({
        id: `${id}-${index + 1}`,
        parentId: id,
      }));
      return [...prevBoxes, ...newBoxes];
    });
  };

  const renderBoxes = (parentId) => {
    const childBoxes = boxes.filter((box) => box.parentId === parentId);
    if (childBoxes.length === 0) {
      // Render a clickable box if there are no children
      return (
        <div className="box" onClick={() => handleBoxClick(parentId)} />
      );
    }

    // Render child boxes recursively
    return (
      <div className="box-container">
        {childBoxes.map((childBox) => (
          <div key={childBox.id} className="box-wrapper">
            {renderBoxes(childBox.id)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="box-split-container">
      {renderBoxes(null)}
    </div>
  );
};

export default BoxSplit;
