import React from 'react';

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
    <div className="title-row" style={{ marginBottom: 0 }}>
      <h2>{props.type}</h2>
      <a href="/books" className="control">{sanitizeLength(props.length)}</a>
    </div>
    <div>
      <h4 style={{ marginBottom: 0 }}>{props.title}</h4>
      <p>{props.author}</p>
    </div>
  </div>
);

export default BookDetails;
