import React, { Component } from 'react';
import $ from 'jquery';

const apiUrl = '/api/v1';

class TableOfContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [{
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
      }],
      newChapterName: '',
      buttonVisible: true,
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/books/5902322f786d931ff0a56152/chapters`)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
      // .then(res => this.setState({ chapters: res.chapters }));
  }

  // addChapter = e => {
  //   const postData = {
  //     name: 'What?',
  //     number: 4,
  //   };
  //   $.post('/api/v1/books/5902322f786d931ff0a56152/chapters/', postData).then(res => {
  //     if (res.status === 'error') {
  //       alert(res.message);
  //     } else {
  //       console.log(res)
  //       window.location.href = '/';
  //     }
  //   });
  //   e.preventDefault();
  // }

  toggleVisibility = e => {
    this.setState({ buttonVisible: false });
  }

  handleKeyPress = e => {
    const newChapter = {
      name: this.state.newChapterName,
      number: this.state.chapters.length + 1,
    };
    if (e.key === 'Enter') {
      this.state.buttonVisible = true;
      this.setState({ chapters: this.state.chapters.concat(newChapter)}, () => this.state.buttonVisible = true);
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state.newChapterName));
  }

  render() {
    const { chapters, newChapterName, buttonVisible } = this.state;
    const { title } = this.props;
    return (
      <div className='content-block content-block-standard'>
        <h4>Table of Contents</h4>
        <h4><span>{title}</span></h4>
          {chapters.map((chapter, index) => (
            <div>
              <h5><span>Chapter {chapter.number}</span></h5>
              <p>{chapter.name}</p>
            </div>
          ))}
        <div className='submit-row submit-row-small'>
          <div className='buttons'>
            { buttonVisible ? 
              <button className='button button-red' onClick={this.toggleVisibility}>Add Chapter {chapters.length + 1}</button>
              :
              <input
              type='text'
              name='newChapterName'
              placeholder='Enter Chapter Name'
              value={newChapterName}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default TableOfContents;
