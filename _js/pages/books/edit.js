import React, { Component } from 'react';
import { render } from 'react-dom';
import TinyMCE from 'react-tinymce';

import TableOfContents from '../../components/books/TableOfContents';
import BookDetails from '../../components/books/BookDetails';

const apiUrl = `/api/v1`;

const chapters = [{
  name: 'Hello, world!',
  number: 1,
},
{
  name: 'Test',
  number: 2,
},
{
  name: 'Even more',
  number: 3,
}];

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      chapters,
      newChapterName: '',
      buttonVisible: true,
    };
  }

  componentWillMount() {
    this.loadData();
    // fetch(`${apiUrl}/users/${this.state.author}`)
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       author: res.author,
    //     })
    //   })
  }

  loadData = () => {
    fetch(`/api/v1/books/${bookId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          title: res.data.title,
          author: res.data.author
        });
      });
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
        <BookDetails title={title} bookId={bookId} author={author} chapters={chapters.length} />
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
