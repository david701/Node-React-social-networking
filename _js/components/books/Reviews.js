import React from 'react';
import $ from 'jQuery';

import Rating from '../dashboard/Rating';

export default class Reviews extends React.Component{
	state = {reviews:[]}
	componentDidMount(){
		var reviews = [{
			book_id: 'BookId',
			content: 'This is the most amazing book I have ever read. I can wait to read more.',
			rating: 5,
			author: {name:'Michael Way'},
			status: 1
		}];
		this.setState({reviews: reviews})
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
				<button style={{position:'absolute', bottom:0, left: 0, right: 0, background: '#F2F5F7'}}>
					<h4 style={{margin:0}}>Create Review</h4>
				</button>
			</div>
		)
	}
}
