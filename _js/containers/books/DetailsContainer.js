import React from 'react';

import BookDetails from '../../components/books/BookDetails';

const apiUrl = '/api/v1';

export default class DetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Serial',
      length: 2,
      title: '',
      author: '',
      role: '',
      genre: '',
      tags: [],
      warnings: []
    };
  }

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    fetch(`${apiUrl}/books/${this.props.bookId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const nextState = {
          ...this.state,
          title: res.data.title,
          author: res.data.author.name,
          role: res.data.author.role,
          genre: res.data.genre,
          tags: JSON.parse(res.data.tags).join(', '),
          warnings: JSON.parse(res.data.warnings).join(', '),
        };
        this.setState(nextState);
      });
  }

  // loadChapterInfo = () => {
  //   fetch(`${apiUrl}/books/${this.props.bookId}/chapters`)
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //       const nextState = { ...this.state, length: res.data.length };
  //       this.setState(nextState);
  //     });
  // }

  render() {
    return (
      <BookDetails
        type={this.state.type}
        length={this.props.length}
        title={this.state.title}
        author={this.state.author}
        rating={this.props.rating}
        genre={this.state.genre}
        tags={this.state.tags}
        warnings={this.state.warnings}
      />
    );
  }
}
