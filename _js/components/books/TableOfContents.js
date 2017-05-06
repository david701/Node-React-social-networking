import React from 'react';

const TableOfContents = props => (
  <div className="content-block content-block-standard">
    <h4>Table of Contents</h4>
    <h4><span>{props.title}</span></h4>
    <ul>
      {props.chapters.map((chapter, key) => (
        <li key={chapter.number} onClick={() => props.selectChapter(key + 1)}>
          <h5>Chapter {chapter.number}</h5>
          <p>{chapter.name}</p>
        </li>
      ))}
    </ul>
    <AddChapter {...props} />
  </div>
);

const AddChapter = props => (
  <div className="chapter-row chapter-row-small">
    <div className="buttons">
      {props.buttonVisible ?
        <button
          className="button button-red"
          value={props.buttonVisible}
          onClick={props.toggleVisibility}
        >
          Add Chapter {props.chapters.length + 1}
        </button>
        :
        <div className="add-or-remove">
          <input
            type="text"
            name="newChapterName"
            placeholder="Enter Chapter Name"
            value={props.newChapterName}
            onChange={props.handleChange}
            style={{ marginRight: '20px' }}
          />
          <button className="button button-plusminus" onClick={props.handleSubmit}>+</button>
          <button className="button button-plusminus" onClick={props.toggleVisibility} value={props.buttonVisible}>-</button>
        </div>
      }
    </div>
  </div>
);

export default TableOfContents;
