import React from 'react';

import Rating from '../dashboard/Rating';

const BookDetails = ({ title, author, chapters }) => (
  <div>
    <div className="content-block content-block-standard">
      <div className="title-row">
        <h3>Serial</h3>
        <a className="control" href="/dashboard/all-users">{chapters} Chapters</a>
      </div>
      <div>
        <h4><span>{title}</span></h4>
        <p>{author} [AUTHOR NAME SHOULD GO HERE - TEMPORARY]</p>
        <Rating />
      </div>
    </div>
  </div>
);

export default BookDetails;
