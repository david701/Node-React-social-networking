import React from 'react';
import Rating from '../dashboard/Rating';

const Book = props => (
	<li>
			<div className="content-block content-block-book">
					<figure>
							<div className="cover" style={{backgroundImage: 'url('+props.book.cover+')'}}>
									<div className="overlay">
											<a className="button button-red" href={'/books/'+props.book._id}>Preview</a>
											{props.user && props.user.following_books.indexOf(props.book._id) < 0?(
												<button className="button button-white" id={props.book._id} onClick={props.followBook}>Add to Library</button>
												):''}
											{props.user && props.user.following_books.indexOf(props.book._id) > -1?(
												<button className="button button-white" id={props.book._id} onClick={props.unfollowBook}>Unfollow Book</button>
												):''}
									</div>
							</div>
							<figcaption>
									<h4>{props.book.title}</h4>
									<p>By {props.book.author.name}</p>
									<Rating stars={props.book.rating? Math.floor(props.book.rating):0} />
							</figcaption>
					</figure>
			</div>
	</li>
)

export default Book;
