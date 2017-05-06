import React from 'react';
import TinyMCE from 'react-tinymce';

function sanitizeContent(content) {
  return content;
}

const Editor = props => (
  <div className="content-block content-block-standard">
    <h1>{props.name}</h1>
    <TinyMCE
      content={sanitizeContent(props.content)}
      onChange={props.handleChange}
    />
    <div className="submit-row submit-row-small">
      <div className="buttons">
        <button className="button button-gray">Delete</button>
        <button className="button" onClick={props.handleSubmit}>Save</button>
      </div>
    </div>
  </div>
);

export default Editor;
