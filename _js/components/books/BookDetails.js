import React from 'react';

import Rating from '../dashboard/Rating';

const BookDetails = ({ title, author }) => (
  <div>
    <div className="content-block content-block-standard account-block">
      <div className="title-row">
        <h3>Serial</h3>
        <a className="control" href="/dashboard/all-users">2 Chapters</a>
      </div>
      <div>
        <h4><span>{title}</span></h4>
        <p>{author} [AUTHOR NAME - TEMPORARY]</p>
        <Rating />
      </div>
    </div>
  </div>
);

export default BookDetails;
