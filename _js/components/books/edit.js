import React, { Component } from 'react';
import { render } from 'react-dom';
import TinyMCE from 'react-tinymce';

import TableOfContents from './TableOfContents';

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
        const data = res.data;
        this.setState({
          title: data.title,
        }, () => console.log(this.state));
      });
  }

  render() {
    const { title, chapters } = this.state;
    return (
      <div>
        <div className="content-block content-block-standard account-block">
          <header>
            <h3>Serial</h3>
          </header>
        </div>
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
