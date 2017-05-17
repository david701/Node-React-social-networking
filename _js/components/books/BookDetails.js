import React from 'react';
import $ from 'jQuery';
import Rating from '../dashboard/Rating';

const apiUrl = '/api/v1';

function sanitizeLength(length) {
  if (length === 0) {
    return 'No Chapters';
  } else if (length === 1) {
    return `${length} Chapter`;
  } else if (length > 1) {
    return `${length} Chapters`;
  }
  return '';
}

export default class BookDetails extends React.Component {
	state = {following: this.props.following};

	componentWillReceiveProps(nextProps){
		this.setState({following: nextProps.following})
	}

	follow = ()=>{
		$.post(`${apiUrl}/books/${this.props.bookId}/follow`)
		.then(res => {
			this.setState({following: true})
		})
	}

	unfollow = ()=>{
		$.ajax({
			url: `${apiUrl}/books/${this.props.bookId}/follow`,
			type: 'DELETE',
		}).then(res => {
			this.setState({following: false})
		})
	}

	render(){
		var followBtn;
		if(!this.props.authorized){
			if(this.state.following){
				followBtn = <button onClick={this.unfollow} className="button-red" style={{width: 'auto', padding: '0.9375rem 2rem', margin: '1rem 0 0'}}>Unfollow</button>;
			}else{
				followBtn = <button onClick={this.follow}  style={{width: 'auto', padding: '0.9375rem 2rem', margin: '1rem 0 0'}}>Follow</button>;
			}
		}

		return(
		  <div className="content-block content-block-standard-new" style={{overflow: 'hidden'}}>
		    <div className="title-row">
		      <h2>{this.props.type}</h2>
		      <a href="/books" className="control">{sanitizeLength(this.props.length)}</a>
		    </div>
		    <div>
		      <img src="/assets/images/cat.gif" alt="cat-avatar" style={{ float: 'right' }} height={175} width={175} />
		      <h4 className="book-title">{this.props.title}</h4>
		      <p>{this.props.author}</p>
		      <Rating stars={this.props.rating} />
		      <p><strong>Content Warnings</strong>: {this.props.warnings || 'Genre 1, Genre 2'}</p>
		      <p><strong>Genre</strong>: {this.props.genres || 'Genre 1, Genre 2, Genre 3'}</p>
		      <p><strong>Tags</strong>: {this.props.tags || 'Tag 1, Tag 2, Tag 3'}</p>
		    </div>
				{followBtn}
		    <div style={{ marginTop: '1.5rem' }}><p>Details | Cover | Table of Contents</p></div>
		  </div>
		);
	}
}
