import React, {Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

import TableOfContents from '../../components/books/TableOfContents';
import BookDetails from '../../components/books/BookDetails';
import Editor from '../../components/books/Editor';

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

  componentDidMount() {
    fetch(`/api/v1/books/${bookId}/chapters`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          ...this.state,
          chapters: res.data,
        }, () => console.log(this.state));
      });
  }

  toggleVisibility = e => {
    this.setState({ buttonVisible: !this.state.buttonVisible, newChapterName: '' });
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value}, () => console.log(this.state.newChapterName));
    const newChapter = {
      name: this.state.newChapterName,
      number: this.state.chapters.length + 1,
    };
    if ((e.key === 'Enter' || e.button === 0) && this.state.newChapterName) {
      this.state.buttonVisible = true;
      this.setState({ chapters: this.state.chapters.concat(newChapter) }, () => this.state.buttonVisible = true);
    }
  }

  render() {
    const { title, author, chapters, newChapterName, buttonVisible, chapterContent } = this.state;
    return (
      <div>
        <BookDetails title={title} bookId={bookId} author={author} length={chapters.length} />
        {/* Ads and Description component will go here */}
        <TableOfContents
          title={title}
          chapters={chapters}
          newChapterName={newChapterName}
          buttonVisible={buttonVisible}
          handleChange={this.handleChange}
          toggleVisibility={this.toggleVisibility}
        />
        { chapters.length ? 
          <Editor
            bookId={bookId}
            bookName={chapters}
            chapterId={chapters.length} // dynamic later
          /> : '' }
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
