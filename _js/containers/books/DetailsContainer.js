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
    };
  }

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    fetch(`${apiUrl}/books/${bookId}`)
      .then(res => res.json())
      .then(res => {
        const nextState = { ...this.state, title: res.data.title, author: res.data.author.name };
        this.setState(nextState);
      });
  }

  render() {
    return (
      <BookDetails
        type={this.state.type} // Endpoint for type?
        length={this.state.length}
        title={this.state.title}
        author={this.state.author}
      />
    );
  }
}