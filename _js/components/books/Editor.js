import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';

function sanitizeContent(content) {
	return content;
}

class Editor extends Component{
	componentWillReceiveProps(nextProps){
		if(nextProps.content!==this.props.content){
			tinymce.EditorManager.get('react-tinymce-0').setContent(nextProps.content);
		}
	}

	render(){
		return(
			<div className="content-block content-block-standard-new">
				<h1>{this.props.name}</h1>
				<TinyMCE
					content={sanitizeContent(this.props.content)}
					config={{
						plugins: 'autolink link image',
						toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
					}}
					onChange={this.props.handleChange}
					/>
				<div className="submit-row submit-row-small">
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
