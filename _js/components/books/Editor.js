import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';

function sanitizeContent(content) {
  return content;
}

function renderContent(content) {
  return { __html: content }
}

class Editor extends Component{
  componentWillReceiveProps(nextProps){
    if(nextProps.content!==this.props.content){
      tinymce.EditorManager.get('react-tinymce-0').setContent(nextProps.content);
    }
  }

  render(){
    const { content } = this.props;
    return(
      <div className="content-block content-block-standard-slide">
        <h1>{this.props.name}</h1>
        {/* fetch user permissions*/}
        <TinyMCE
          content={sanitizeContent(this.props.content)}
          config={{
            plugins: 'autolink link image',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
          }}
          onChange={this.props.handleChange}
        />
        {/* <div dangerouslySetInnerHTML={renderContent(content)}></div> */}
        <div className="submit-row submit-row-editor">
          <div className="buttons">
            <button className="button button-gray">Delete</button>
            <button className="button" onClick={this.props.handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Editor;
