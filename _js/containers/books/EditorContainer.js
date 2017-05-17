import React from 'react';

import Editor from '../../components/books/Editor';
import Reader from '../../components/books/Reader';

const apiUrl = '/api/v1';

export default class EditorContainer extends React.Component {
	state = {
		name: '',
		number: '',
		content: '',
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
    const { bookId, chapterNumber } = this.props;
		if(chapterNumber){
			fetch(`${apiUrl}/books/${bookId}/chapters/${chapterNumber}`)
			.then(res => res.json())
			.then(res => {
				const nextState = {
					...this.state,
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
			cardContent = <Reader content={this.state.content} />
		}
    return (
    <div className="content-block content-block-standard-slide">
			<h1>{this.state.name} {this.props.authorized? <span className="edit_chapter_btn" onClick={this.editChapter}>(Edit Chapter)</span>:''}</h1>
    	{cardContent}
    </div>
    );
  }
}
