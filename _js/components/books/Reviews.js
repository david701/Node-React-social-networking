import React from 'react';
import $ from 'jQuery';

import Rating from '../dashboard/Rating';

export default class Reviews extends React.Component{
	state = {reviews:[], addReview: false, content: ''}
	componentDidMount(){
		var reviews = [{
			book_id: 'BookId',
			content: 'This is the most amazing book I have ever read. I can wait to read more.',
			rating: 5,
			author: {name:'Michael Way'},
			status: 1
		}, {
			book_id: 'BookId',
			content: 'This is the most amazing book I have ever read. I can wait to read more.',
			rating: 5,
			author: {name:'Michael Way'},
			status: 1
		}, {
			book_id: 'BookId',
			content: 'This is the most amazing book I have ever read. I can wait to read more.',
			rating: 5,
			author: {name:'Michael Way'},
			status: 1
		}];
		this.setState({reviews: reviews})
	}

	addReview = ()=>{
		this.setState({addReview: true});
	}
	cancelReview = ()=>{
		this.setState({addReview: false});
	}

	submitReview = ()=>{
		this.setState({content:''})
	}

	_onChange = (e)=>{
		var state = {};
		state[e.target.name]=e.target.value;
		this.setState(state)
	}

	render(){
		var reviews = this.state.reviews.map((review, key)=>{
			if(review.status > 0){
				return(
					<li key={key}>
						<Rating stars={review.rating} />
						<p>By {review.author.name}</p>
						<p>
							{review.content}
						</p>
					</li>
				)
			}
		})
		return(
			<div>
				<h4>Reviews</h4>
				<ul>
					{reviews}
				</ul>
				<button onClick={this.addReview} style={{position:'absolute', bottom:0, left: 0, right: 0, background: '#F2F5F7'}}>
					<h4 style={{margin:0}}>Create Review</h4>
				</button>
				{this.state.addReview?
				<div className="add_review" style={{ position: 'absolute', bottom:0, left: 0, right: 0, top:0, background: 'rgba(0,0,0,0.5)'}}>
					<div style={{position: 'absolute', bottom:'0.5rem', left: '0.5rem', right: '0.5rem', top:'0.5rem', background:'#fff', padding:'1rem'}}>
						<h4 style={{textAlign:'center', fontSize:'1.5em'}}>Create Review</h4>
						<form>
							<textarea rows='4' name="content" onChange={this._onChange} value={this.state.content}></textarea>
							<div style={{float:'right'}}>
								<button className="button-white" onClick={this.cancelReview} style={{width:'auto', paddingRight: '2rem', paddingLeft:'2rem', marginRight: '1rem', marginTop: '1rem', display:'inline-block'}}>Cancel</button>
								<button className="button-red" style={{width:'auto', paddingRight: '2rem', paddingLeft:'2rem', marginTop: '1rem', display:'inline-block'}}>Submit</button>
							</div>
						</form>
					</div>
				</div>:''}
			</div>
		)
	}
}
