import React, { Component } from 'react';
import { render } from 'react-dom';

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentWillMount() {
    fetch(`/api/v1/books/${bookId}`)
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    return (
      <div className="content-block content-block-standard account-block">
        <header>
          <h3>Serial</h3>
        </header>
        <TableOfContents />
      </div>
    );
  }
}

const TableOfContents = () => (
  <div>
    <h4>Table of Contents</h4>
    <div>
      <h4><span>Chapter 1</span></h4>
      <p>Chapter Name (In Progress)</p>
    </div>
    <div className="submit-row submit-row-small">
      <div className="buttons">
        <button className="button button-red">Add Chapter</button>
      </div>
    </div>
  </div>
);


if (document.getElementById('edit-book')) {
  render(
    <EditBook />,
    document.getElementById('edit-book'),
  );
}
