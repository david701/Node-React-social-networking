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
    const { title, author } = this.state;
    return (
      <div>
        <BookDetails title={title} bookId={bookId} author={author} status={status} />
        <div className="content-block">
          <div className="placeholder">
            <h4>Ad Space</h4>
          </div>
        </div>
        <div className="content-block">
          <div className="placeholder">
            <h4>Description</h4>
          </div>
        </div>
        <TableOfContents title={title} bookId={bookId} />
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
