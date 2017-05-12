import React from 'react';
import Rating from '../dashboard/Rating';

function sanitizeLength(length) {
  if (length === 0) {
    return 'No Chapters';
  } else if (length === 1) {
    return `${length} Chapter`;
  } else if (length > 1) {
    return `${length} Chapters`;
  }
  return '';
}

const BookDetails = props => (
  <div className="content-block content-block-standard-new">
    <div className="title-row">
      <h2>{props.type}</h2>
      <a href="/books" className="control">{sanitizeLength(props.length)}</a>
    </div>
    <div>
      <img src="/assets/images/cat.gif" alt="cat-avatar" style={{ float: 'right' }} height={175} width={175} />
      <h4 className="book-title">{props.title}</h4>
      <p>{props.author}</p>
      <Rating stars={props.rating} />
      <p><strong>Content Warnings</strong>: {props.warnings || 'N/A'}</p>
      <p><strong>Genre</strong>: {props.genre || 'N/A'}</p>
      <p><strong>Tags</strong>: {props.tags || 'N/A'}</p>
    </div>
    <InfoRow chapters={props.chapters} selectChapter={props.selectChapter} />
  </div>
);

const InfoRow = props => (
  <div className="info-row">
    <p className="info-selector">Details | Cover | Table of Contents</p>
    <ChapterSelector chapters={props.chapters} selectChapter={props.selectChapter} />
  </div>
);

const ChapterSelector = ({ chapters, selectChapter }) => (
  <select className="chapter-selector" name="selectChapter">
    {chapters.map((chapter, index) => (
      <option key={index} value={chapter.number} onSelect={selectChapter}>{chapter.name}</option>
    ))}
  </select>
);

export default BookDetails;
