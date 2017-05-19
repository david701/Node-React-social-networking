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
		var followBtn, rating=0;
		if(!this.props.authorized){
			if(this.state.following){
				followBtn = <button onClick={this.unfollow} className="button-red" style={{width: 'auto', padding: '0.9375rem 2rem', margin: '1rem 0 0'}}>Unfollow</button>;
			}else{
				followBtn = <button onClick={this.follow}  style={{width: 'auto', padding: '0.9375rem 2rem', margin: '1rem 0 0'}}>Follow</button>;
			}
		}

		if(this.props.book && this.props.book.rating){
			rating = this.props.book.rating;
		}

		return(
		  <div className="content-block content-block-standard-new" style={{overflow: 'hidden'}}>
		    <div className="title-row">
		      <h2>{this.props.type}</h2>
		      <a href="/books" className="control">{sanitizeLength(this.props.length)}</a>
		    </div>
		    <div className="profile-info">
		      <img src="/assets/images/day-read.gif" className="day" alt="cat-avatar" style={{ float: 'right' }} height={175} width={175} />
		      <img src="/assets/images/night-read.gif" className="night" alt="cat-avatar" style={{ float: 'right' }} height={175} width={175} />
		      <h4 className="book-title">{this.props.title}</h4>
		      <p>{this.props.author}</p>
		      <Rating stars={rating} />
		      <p><strong>Content Warnings</strong>: {this.props.warnings || ''}</p>
		      <p><strong>Genre</strong>: {this.props.genre || ''}</p>
		      <p><strong>Tags</strong>: {this.props.tags || ''}</p>
		    </div>
		    <button onClick={this.props.toggleScreen} className="button toggleScreen" value="true">{this.props.toggleStatus}</button>
		    <div style={{ position: 'absolute', bottom: '1rem'}}><p>Details | Cover | Table of Contents</p></div>
		  </div>
		);
	}
}
