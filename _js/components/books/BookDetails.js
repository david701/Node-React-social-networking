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
    <div className="title-row" style={{ marginBottom: 0 }}>
      <h2>{props.type}</h2>
      <a href="/books" className="control">{sanitizeLength(props.length)}</a>
    </div>
    <div>
      <h4 style={{ marginBottom: 0 }}>{props.title}</h4>
      <p>{props.author}</p>
    </div>
    <div>
      <Rating stars={props.rating} />
      <ContentWarning />
      <Genre />
      <Tags />
    </div>
  </div>
);

const ContentWarning = props => (
  <p><strong>Content Warnings</strong>: {props.warnings || 'Genre 1, Genre 2'}</p>
);

const Genre = props => (
  <p><strong>Genre</strong>: {props.genres || 'Genre 1, Genre 2, Genre 3'}</p>
);

const Tags = props => (
  <p><strong>Tags</strong>: {props.tags || 'Tag 1, Tag 2, Tag 3'}</p>
);

export default BookDetails;
