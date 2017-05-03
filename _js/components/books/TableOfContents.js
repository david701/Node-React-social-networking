import React, { Component } from 'react';
import $ from 'jquery';

const apiUrl = '/api/v1';

class TableOfContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/books/5902322f786d931ff0a56152/chapters`)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
      // .then(res => this.setState({ chapters: res.chapters }));
  }

  addChapter = e => {
    console.log(e.target.className);
    const postData = {
      name: 'Hello world',
      number: 2,
    };
    $.post('/api/v1/books/5902322f786d931ff0a56152/chapters', postData).then(res => {
      if (res.status === "error") {
        alert(res.message);
      } else {
        window.location.href = "/";
      }
    });
    e.preventDefault();
  }

  render() {
    const { chapters } = this.state;
    const { title } = this.props;
    return (
      <div>
        <h4>Table of Contents</h4>
        <h4><span>{title}</span></h4>
        <div>
        </div>
        <div className="submit-row submit-row-small">
          <div className="buttons">
            <button className="button button-red" onClick={(e) => this.addChapter(e)}>Add Chapter</button>
          </div>
        </div>
        <textarea name="inputChapterName" id="inputChapterName" cols="2" rows="1" />
      </div>
    );
  }
}

export default TableOfContents;
