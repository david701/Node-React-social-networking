import React from 'react';

function sanitizeLength(length) {
  if (length === 1) {
    return `${length} Chapter`;
  } else if (length > 1) {
    return `${length} Chapters`;
  }
  return '';
}


const BookDetails = props => (
  <div className="content-block content-block-standard">
    <div className="title-row">
      <h3>{props.type}</h3>
      <a href="/books" className="control">{sanitizeLength(props.length)}</a>
    </div>
    <div>
      <h4><span>{props.title}</span></h4>
      <p>{props.author}</p>
    </div>
  </div>
);

export default BookDetails;
