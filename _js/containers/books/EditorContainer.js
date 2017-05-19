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
		editChapter: false
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
    const { bookId, chapterId } = this.props;
    fetch(`${apiUrl}/books/${bookId}/chapters/${chapterId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        number: this.state.number,
        content: this.state.content,
      })
    })
    .then(res => res.json())
    .then(res => {
			this.setState({editChapter: false});
		})
    .catch(err => console.log(err));
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
			<h1>{this.state.name} {this.props.authorized? <span className="edit_chapter_btn" onClick={this.editChapter}>(Edit Chapter)</span>:''}</h1>
    	{cardContent}
    </div>
    );
  }
}
