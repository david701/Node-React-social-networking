import React from 'react';

const TableOfContents = props => {
  const { chapters, newChapterName, buttonVisible, title, handleChange, toggleVisibility } = props;
  return (
    <div className="content-block content-block-standard">
      <h4>Table of Contents</h4>
      <h4><span>{title}</span></h4>
      {chapters.map(chapter => (
        <div>
          <h5><span>Chapter {chapter.number}</span></h5>
          <p>{chapter.name}</p>
        </div>
      ))}
      <div className="submit-row submit-row-small">
        <div className="buttons">
          { buttonVisible ?
            <button className="button button-red" value={buttonVisible} onClick={toggleVisibility}>Add Chapter {chapters.length + 1}</button>
            :
            <div style={{ display: 'flex' }}>
              <input
                type="text"
                name="newChapterName"
                placeholder="Enter Chapter Name"
                value={newChapterName}
                onChange={handleChange}
              />
              <button className="button" onClick={handleChange}>+</button>
              <button className="button" value={buttonVisible} onClick={toggleVisibility}>-</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
