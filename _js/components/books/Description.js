import React from 'react';

const Description = props => (
  <div className="content-block content-block-standard-slide">
    <div className="title-row" style={{ marginBottom: 0 }}>
      <h4>Description</h4>
    </div>
    <div>
      {props.description || 'Description goes here'}
    </div>
  </div>
);

export default Description;
