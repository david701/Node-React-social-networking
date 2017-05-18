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

  componentWillReceiveProps(nextProps){
		if(nextProps.book){
			var state = {
				title: nextProps.book.title,
				author: nextProps.book.author.name,
				genre: nextProps.book.genre,
			}

			if(nextProps.book.tags && nextProps.book.tags.length){
				state.tag = JSON.parse(nextProps.book.tags).join(', ')
			}

			if(nextProps.book.warnings && nextProps.book.warnings.length){
				state.warnings = JSON.parse(nextProps.book.warnings).join(', ')
			}

			this.setState(state)
		}
  }

  render() {
    // const { length, rating, selectedChapter } = this.props;
    const { type, title, author, genre, tags, warnings } = this.state;
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
        toggleScreen={this.props.toggleScreen}
        toggleStatus={this.props.toggleStatus}
				genre={genre}
        tags={tags}
        warnings={warnings}
      />
    );
  }
}
