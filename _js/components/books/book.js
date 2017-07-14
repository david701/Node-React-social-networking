import React from 'react';
import Rating from '../dashboard/Rating';
import BookType from '../BookType.js';

const Book = props => (
	<li>
			<div className="content-block content-block-book">
					<BookType type={props.book.type}/>
					<figure>
							<div className="cover" style={{backgroundImage: 'url('+props.book.cover+')'}}>
									<div className="overlay">
											<a className="button button-red" href={'/books/'+props.book._id}>Read</a>
											{props.user && !props.userBooks && props.user.following_books && props.user.following_books.indexOf(props.book._id) < 0?(
												<button className="button button-white" id={props.book._id} onClick={props.followBook}>Follow</button>
												):''}
											{props.user && !props.userBooks && props.user.following_books && props.user.following_books.indexOf(props.book._id) > -1?(
												<button className="button button-white" id={props.book._id} onClick={props.unfollowBook}>Unfollow</button>
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
