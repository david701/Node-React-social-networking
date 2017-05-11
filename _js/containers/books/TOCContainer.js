import React from 'react';

import TableOfContents from '../../components/books/TableOfContents';

const apiUrl = `/api/v1`;

export default class TocContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      chapters: [],
      buttonVisible: true,
    };
  }

  componentDidMount() {
    this.loadBookInfo();
  }

  handleChange = e => {
    const nextState = { ...this.state, [e.target.name]: e.target.value };
    this.setState(nextState);
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${apiUrl}/books/${this.props.bookId}/chapters`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.newChapterName,
        number: this.props.chapters.length + 1,
        content: 'test',
      }),
    })
    .then(res => res.json())
    .then(res => this.props.loadChapters())
    .then(() => this.props.selectChapter(this.props.chapters.length + 1))
    .catch(err => console.log(err));
  }

  loadBookInfo = () => {
    fetch(`${apiUrl}/books/${bookId}`)
      .then(res => res.json())
      .then(res => {
        const nextState = { ...this.state, title: res.data.title };
        this.setState(nextState);
      });
  }

  toggleVisibility = e => {
    const nextState = { ...this.state, buttonVisible: !this.state.buttonVisible, newChapterName: '' };
    this.setState(nextState);
  }

  render() {
    return (
      <TableOfContents
        buttonVisible={this.state.buttonVisible}
        chapters={this.props.chapters}
        title={this.state.title}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        selectChapter={this.props.selectChapter}
        toggleVisibility={this.toggleVisibility}
      />
    );
  }
}