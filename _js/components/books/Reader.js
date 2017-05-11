import React from 'react';

function renderContent(content) {
  return { __html: content };
}

const Reader = props => (
  <div className="content-block content-block-standard-slide">
    <h4>{props.name}</h4>
    <div style={{ marginTop: '20px' }}>
      <div dangerouslySetInnerHTML={renderContent(props.content)}></div>
    </div>
  </div>
);

export default Reader;

