import React from 'react';

const TableOfContents = props => {
  const { chapters, newChapterName, buttonVisible, title, handleChange, toggleVisibility } = props;
  return (
    <div className="content-block content-block-standard">
      <h4>Table of Contents</h4>
      <h4><span>{title}</span></h4>
      {chapters && chapters.map(chapter => (
        <div>
          <h5><span>Chapter {chapter.number}</span></h5>
          <p>{chapter.name}</p>
        </div>
      ))}
      <div className="chapter-row chapter-row-small">
        <div className="buttons">
          { buttonVisible ?
            <button className="button button-red" value={buttonVisible} onClick={toggleVisibility}>Add Chapter {chapters.length + 1}</button>
            :
            <div className="add-or-remove">
              <input
                type="text"
                name="newChapterName"
                placeholder="Enter Chapter Name"
                value={newChapterName}
                onChange={handleChange}
                style={{ marginRight: '20px' }}
              />
              <button className="button button-plusminus" onClick={handleChange}>+</button>
              <button className="button button-plusminus" value={buttonVisible} onClick={toggleVisibility}>-</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
