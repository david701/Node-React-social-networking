import React, { Component } from 'react';
import { render } from 'react-dom';
import TinyMCE from 'react-tinymce';

import TableOfContents from '../../components/books/TableOfContents';
import BookDetails from '../../components/books/BookDetails';

const apiUrl = `/api/v1`;

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      chapters: [],
      newChapterName: '',
      buttonVisible: true,
    };
  }

  componentWillMount() {
    fetch(`/api/v1/books/${bookId}/chapters`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          ...this.state,
          chapters: res.data,
        }, () => console.log(this.state));
      })
  }

  toggleVisibility = e => {
    const value = e.target.value;
    this.setState({ buttonVisible: !value, newChapterName: '' });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state.newChapterName));
    const newChapter = {
      name: this.state.newChapterName,
      number: this.state.chapters.length + 1,
    };
    if ((e.key === 'Enter' || e.button === 0) && this.state.newChapterName) {
      this.state.buttonVisible = true;
      this.setState({ chapters: this.state.chapters.concat(newChapter)}, () => this.state.buttonVisible = true);
    }
  }

  render() {
    const { title, author, chapters, newChapterName, buttonVisible } = this.state;
    return (
      <div>
        <BookDetails title={title} bookId={bookId} author={author} length={chapters.length} />
        {/*<div className="content-block">
          <div className="placeholder">
            <h4>Ad Space</h4>
          </div>
        </div>
        <div className="content-block">
          <div className="placeholder">
            <h4>Description</h4>
          </div>
        </div>*/}
        <TableOfContents 
          title={title}
          chapters={chapters}
          newChapterName={newChapterName}
          buttonVisible={buttonVisible}
          handleChange={this.handleChange}
          toggleVisibility={this.toggleVisibility}
        />
      </div>
    );
  }
}

if (document.getElementById('edit-book')) {
  render(
    <EditBook />,
    document.getElementById('edit-book'),
  );
}
