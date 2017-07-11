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
    authorized: false
	};

  componentDidMount() {
    this.loadChapterInfo();
  }

  componentDidUpdate(nextProps) {
    if (this.props.chapterNumber !== nextProps.chapterNumber) {
      this.loadChapterInfo();
    }
    return false;
  }

  loadChapterInfo = () => {
    const { bookId, chapterNumber } = this.props;
		console.log('Load chapter', bookId);
		console.log('Load chapter', chapterNumber);
		console.log('call', `${apiUrl}/books/${bookId}/chapters/${chapterNumber}`);
		if(chapterNumber){
			$.get(`${apiUrl}/books/${bookId}/chapters/${chapterNumber}`)
			.then(res => {
				console.log('chapter', res.data);
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
    let data = {
        name: this.state.name,
        number: this.state.number,
        content: this.state.content
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

	deleteChapter = e =>{
		const { bookId, chapterId, chapterNumber } = this.props;
		e.preventDefault;
		$.ajax({
        url: `${apiUrl}/books/${bookId}/chapters/${chapterNumber}`,
        type: 'DELETE'
    }).then(()=>{
			location.reload();
		});
	}

  render() {
		var cardContent;
		if(this.state.editChapter){
			cardContent =  <Editor
	        content={this.state.content}
	        handleChange={this.handleChange}
	        handleSubmit={this.handleSubmit}
					deleteChapter={this.deleteChapter}
	        name={this.state.name}
	      />
		}else{
			cardContent = <Reader content={this.state.content} bookId={this.props.bookId} chapterId={this.props.chapterId} user={this.props.user} admin={this.props.admin} authorized={this.props.authorized}/>
		}
    return (
    <div className="content-block content-block-standard-slide">
      {this.props.authorized &&
			<h4>Chapter {this.state.number} Editor {this.props.authorized && !this.state.editChapter ? <span className="edit_chapter_btn" onClick={this.editChapter}>Click to Edit {this.state.name}</span>:''}</h4>
    	}
      {cardContent}
    </div>
    );
  }
}
