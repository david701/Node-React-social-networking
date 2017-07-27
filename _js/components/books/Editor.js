import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';

function sanitizeContent(content) {
  return content;
}

class Editor extends Component{

  render(){
    const { content } = this.props;
    return(
      <div>
        <TinyMCE
          content={sanitizeContent(this.props.content)}
          config={{
            plugins: 'autolink link image table',
            toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | formatselect | table',
            menubar: false,
            height: this.props.settings.editorHeight
          }}
          onChange={this.props.handleChange}
        />
        <div className="submit-row submit-row-editor">
          <div className="buttons">
            <button className="button button-red" onClick={this.props.deleteChapter}>Delete</button>
            <button className="button" onClick={this.props.handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Editor;
