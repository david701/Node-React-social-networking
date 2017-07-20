import React from 'react';
import moment from 'moment';

const oneDay = 24*60*60*1000;
var today = new Date();

const TableOfContents = props => {
  const {book} = props;
  return(
  <div className="content-block content-block-standard-slide">
    <h4>Table of Contents</h4>
    <ul>
      {props.chapters.map((chapter, key) => (
        <li key={chapter.number} onClick={() => props.selectChapter(key + 1)}>
          <h5>Chapter {chapter.number}</h5>
          <p>{chapter.name}</p>
        </li>
      ))}
    </ul>
    <AddChapter {...props} />
    {book &&
      <div style={{backgroundImage: 'url('+book.cover+')'}} className="book-cover"/>
    }
  </div>
);
}
const AddChapter = props => (
  <div className="chapter-row chapter-row-small">
		{props.authorized?
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
          />
          <button className="button button-plusminus" onClick={props.handleSubmit}>+</button>
          <button className="button button-plusminus" onClick={props.toggleVisibility} value={props.buttonVisible}>-</button>
        </div>
      }
    </div>
		:''}
  </div>
);

export default TableOfContents;
