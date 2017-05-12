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
      warnings: [],
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

  render() {
    // const { length, rating, selectedChapter } = this.props;
    const { type, title, author, genre, tags, warnings } = this.state;
    return (
      <BookDetails
        type={type}
        title={title}
        author={author}
        genre={genre}
        tags={tags}
        warnings={warnings}
        {...this.props}
      />
    );
  }
}
