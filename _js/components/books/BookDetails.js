import React from 'react';

import Rating from '../dashboard/Rating';

const BookDetails = ({ title, author, length }) => (
  <div>
    <div className="content-block content-block-standard">
      <div className="title-row">
        <h3>Serial</h3>
        <a className="control" href="/dashboard/all-users">{length} Chapters</a>
      </div>
      <div>
        <h4><span>{title}</span></h4>
        <p>{author}</p>
        <Rating />
      </div>
    </div>
  </div>
);

export default BookDetails;
