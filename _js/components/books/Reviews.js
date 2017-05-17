import React from 'react';
import $ from 'jQuery';

import Rating from '../dashboard/Rating';

export default class Reviews extends React.Component{
	render(){
		return(
			<div>
				<h4>Reviews</h4>
				<ul>
					<li>
						<Rating stars='5' />
						<p>By [Authors Name] on 5/15/2017</p>
						<p>
							This is the most amazing book I have ever read. I can wait to read more.
						</p>
					</li>
				</ul>
				<button style={{position:'absolute', bottom:0, left: 0, right: 0, background: '#F2F5F7'}}>
					<h4 style={{margin:0}}>Create Review</h4>
				</button>
			</div>
		)
	}
}
