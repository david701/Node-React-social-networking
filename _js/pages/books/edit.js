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
    };
  }

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    fetch(`/api/v1/books/${bookId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res.data);
        this.setState({
          title: res.data.title,
          author: res.data.author,
          chapters: res.data.chapters,
        }, () => console.log(this.state));
      });
  }

  render() {
    const { title, chapters, author } = this.state;
    return (
      <div>
        <BookDetails title={title} bookId={bookId} author={author} status={status} />
        <div className="content-block content-block-standard account-block">
          <TableOfContents title={title} bookId={bookId} />
        </div>
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
