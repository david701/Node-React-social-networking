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
    fetch(`${apiUrl}/books/${this.props.bookId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const nextState = { ...this.state, title: res.data.title, author: res.data.author.name };
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
        type={this.state.type} // Endpoint for type?
				bookId={this.props.bookId}
        length={this.props.length}
        title={this.state.title}
        author={this.state.author}
        rating={this.props.rating}
				following={this.props.following}
				authorized={this.props.authorized}
      />
    );
  }
}
