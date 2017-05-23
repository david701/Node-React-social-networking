import React from 'react';
import Slider from 'react-slick';
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
		this.setState({following: nextProps.following});
	}

	follow = ()=>{
		$.post(`${apiUrl}/books/${this.props.bookId}/follow`)
		.then(res => {
			this.setState({following: true})
		})
	}

	moveSlide = (slide,event) => {
		let slideOver;

		if(slide === "details"){
			slideOver = 0;
		}else if(slide === 'toc'){
			slideOver = 1;
		}else if(slide === 'chapter'){
			slideOver = (parseInt(event.target.value) * 2);
		}
		this.props.slider.slickGoTo(slideOver);
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
		var followBtn, rating=0, chapters = [],
		self = this;
		if(!this.props.authorized){
			if(this.state.following){
				followBtn = <button onClick={this.unfollow} className="button-red" style={{width: 'auto', padding: '0.9375rem 2rem', margin: '1rem 0 0'}}>Unfollow</button>;
			}else{
				followBtn = <button onClick={this.follow}  style={{width: 'auto', padding: '0.9375rem 2rem', margin: '1rem 0 0'}}>Follow</button>;
			}
		}

		if(this.props.length) {
			for(var x = 0; x < this.props.length; x++){
				chapters.push(x)
			}
		}

		if(this.props.book && this.props.book.rating){
			rating = this.props.book.rating;
		}

		return(
		  <div className="content-block content-block-standard-new" style={{overflow: 'hidden'}}>
		    <div className="title-row">
		      <h2>{this.props.type}</h2>
		      <span className="control">{sanitizeLength(this.props.length)}</span>
		    </div>
		    <div className="profile-info">
		      <img src="/assets/images/day-read.gif" className="day" alt="cat-avatar" style={{ float: 'right' }} height={175} width={175} />
		      <img src="/assets/images/night-read.gif" className="night" alt="cat-avatar" style={{ float: 'right' }} height={175} width={175} />
		      <h4 className="book-title">{this.props.title}</h4>
		      <p>{this.props.author}</p>
		      <Rating stars={rating} />
		      <p><strong>Content Warnings</strong>: {this.props.warnings.length ? this.props.warnings.join(", ") : 'N/A'}</p>
		      <p><strong>Genre</strong>: {this.props.genre.length ? this.props.genre.join(", ") : 'N/A'}</p>
		      <p><strong>Tags</strong>: {this.props.tags.length ? this.props.tags.join(", ") : 'N/A'}</p>
		    </div>
		    <button onClick={this.props.toggleScreen} className="button toggleScreen" value="true">{this.props.toggleStatus}</button>
		    {this.props.authorized? (<a href={'/dashboard/edit/books/' + this.props.bookId} className="button toggleScreen">Edit Book</a>):''}
		    <div style={{ position: 'absolute', bottom: '1rem'}}>
		    	<p className="buttons">
		    		<span onClick={(e) => this.moveSlide('details',e)}>Details</span> |
		    		<span onClick={(e) => this.moveSlide('toc',e)}> Table of Contents</span>
		    	</p>
		    </div>
		    {chapters.length > 0 &&
		    <div className="go-to-chapter">
		    	Go to:
				<select onChange={(e) => this.moveSlide('chapter',e)} className="slide-to-chapter">
					<option value="0">Select Chapter</option>
				{
				  chapters.map(function(chapter,i){
				  	return (
						<option key={i} value={i + 1}>Chapter {i + 1}</option>
				  	)
				  })
				}
				</select>
			</div>
			}
		  </div>
		);
	}
}
