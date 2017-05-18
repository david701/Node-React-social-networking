import React from 'react';
import $ from 'jQuery';

import StarRatingComponent from 'react-star-rating-component';
import Rating from '../dashboard/Rating';

const apiUrl = '/api/v1';

export default class Reviews extends React.Component{
	state = {reviews:[], addReview: false, content: '', rating: 0, authorized: false}
	componentDidMount(){
		this.getReviews();
	}

	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.authorized){
	// 		this.setState({authorized: nextProps.authorized})
	// 	}
	// }

	getReviews = ()=>{
		var bookId = this.props.bookId;
		$.get(`${apiUrl}/books/${bookId}/reviews`).then((reviews)=>{
			this.setState({reviews: reviews.data})
		}).catch((err)=>{
			console.log(err);
		})
	}

	addReview = ()=>{
		this.setState({addReview: true});
	}
	cancelReview = ()=>{
		this.setState({addReview: false});
	}

	submitReview = (e)=>{
		e.preventDefault();
		var bookId = this.props.bookId;
		var postData = {content: this.state.content, rating: this.state.rating}
		$.post(`${apiUrl}/books/${bookId}/reviews`, postData).then((resp)=>{
			this.getReviews();
			this.setState({content:'', rating:0, addReview: false})
		}).catch((err)=>{
			console.log(err);
		})
	}

	deleteReview = (e)=>{
		e.preventDefault();
		$.ajax({
			url: `${apiUrl}/reviews/${e.target.id}`,
			method: 'DELETE',
		}).then(()=>{
			this.getReviews();
		}).catch((err)=>{
			console.log(err);
		})
	}

	_onChange = (e)=>{
		var state = {};
		state[e.target.name]=e.target.value;
		this.setState(state)
	}

	handleRating = (rating)=>{
		this.setState({rating: rating});
	}

	render(){
		var reviews;
		if(this.state.reviews.length){
			reviews = this.state.reviews.map((review, key)=>{
				if(review.status > 0){
					return(
						<li key={key} style={{marginBottom: '0.5rem'}}>
							<Rating stars={review.rating} />
							<p>By {review.author.name}</p>
							<p>
								{review.content}
							</p>
							{this.props.admin? <a style={{fontSize: '0.75em', textTramsform:'uppercase', color:'red'}} id={review._id} onClick={this.deleteReview}>Delete Comment</a>:''}
						</li>
					)
				}
			})
		}

		return(
			<div>
				<h4 style={{marginBottom: '0.25em', marginTop:'0.5rem'}}>Reviews</h4>
				<ul style={{paddingBottom: '2rem'}}>
					{reviews}
				</ul>
				<button onClick={this.addReview} style={{position:'absolute', bottom:0, left: 0, right: 0, background: '#F2F5F7'}}>
					<h4 style={{margin:0}}>Create Review</h4>
				</button>
				{this.state.addReview?
				<div className="add_review" style={{ position: 'absolute', bottom:0, left: 0, right: 0, top:0, background: 'rgba(0,0,0,0.5)'}}>
					<div style={{position: 'absolute', bottom:'0.5rem', left: '0.5rem', right: '0.5rem', top:'0.5rem', background:'#fff', padding:'1rem'}}>
						<h4 style={{textAlign:'center', fontSize:'1.5em', marginBottom: '0'}}>Create Review</h4>
							<StarRatingComponent
				        name="rating"
				        emptyStarColor="#D9DCDD"
				        value={this.state.rating}
				        onStarClick={this.handleRating}
				      />
						<hr style={{marginTop:0}}/>
						<textarea rows='4' name="content" onChange={this._onChange} value={this.state.content}></textarea>
						<div style={{float:'right'}}>
							<button className="button-white" onClick={this.cancelReview} style={{width:'auto', paddingRight: '2rem', paddingLeft:'2rem', marginRight: '1rem', marginTop: '1rem', display:'inline-block'}}>Cancel</button>
							<button className="button-red" onClick={this.submitReview} style={{width:'auto', paddingRight: '2rem', paddingLeft:'2rem', marginTop: '1rem', display:'inline-block'}}>Submit</button>
						</div>
					</div>
				</div>:''}
			</div>
		)
	}
}
