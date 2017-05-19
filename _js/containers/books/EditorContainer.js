import React from 'react';

import $ from 'jQuery';

import Editor from '../../components/books/Editor';
import Reader from '../../components/books/Reader';

const apiUrl = '/api/v1';

export default class EditorContainer extends React.Component {
	state = {
		name: '',
		number: '',
		content: '',
		chapter_id: '',
		editChapter: false,
    authorized: true
	};

  componentDidMount() {
    this.loadChapterInfo();
  }

  componentDidUpdate(nextProps) {
    if (this.props.chapterId !== nextProps.chapterId) {
      this.loadChapterInfo();
    }
    return false;
  }

  loadChapterInfo = () => {
    const { bookId, chapterId } = this.props;
		if(chapterId){
			$.get(`${apiUrl}/books/${bookId}/chapters/${chapterId}`)
			.then(res => {
				const nextState = {
					...this.state,
					chapter_id: res.data._id,
					name: res.data.name,
					number: res.data.number,
					content: res.data.content,
				};
				this.setState(nextState);
			});
		}
  }

  handleChange = e => {
    const nextState = { ...this.state, content: e.target.getContent() };
    this.setState(nextState);
  }

  handleSubmit = e => {
    const self = this;
    const { bookId, chapterId, chapterNumber } = this.props;
    //lets strip any html
    let html = this.state.content;
    let text = $(html).text();
    let data = {
      body: {
        name: this.state.name,
        number: this.state.number,
        content: text
      }
    }

    $.ajax({
        url: `${apiUrl}/books/${bookId}/chapters/${chapterNumber}`,
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function(response){
          self.setState({editChapter: false});
        }
    });
  }

	editChapter = e => {
		e.preventDefault;
		this.setState({editChapter: true})
	}

  render() {
		var cardContent;
		if(this.state.editChapter){
			cardContent =  <Editor
	        content={this.state.content}
	        handleChange={this.handleChange}
	        handleSubmit={this.handleSubmit}
	        name={this.state.name}
	      />
		}else{
			cardContent = <Reader content={this.state.content} bookId={this.props.bookId} chapterId={this.state.chapter_id}/>
		}
    return (
    <div className="content-block content-block-standard-slide">
			<h4>Chapter {this.state.number} Editor {this.state.authorized && !this.state.editChapter ? <span className="edit_chapter_btn" onClick={this.editChapter}>Click to Edit {this.state.name}</span>:''}</h4>
    	{cardContent}
    </div>
    );
  }
}
