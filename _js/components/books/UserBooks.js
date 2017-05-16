import React from 'react';

import Rating from '../dashboard/Rating';

export default class UserBooks extends React.Component {
	render(){

		var bookList = this.props.books.map((book, key) => (
			<li key={key}>
				<div className="content-block content-block-book">
					<figure>
						<div
							className="cover"
							style={{
								backgroundImage: book.cover ? "url("+book.cover+")" :"url('/assets/images/pending-cover-art.jpg')",
							}}
							>
							<div className="overlay">
								<a className="button button-red" href={`/books/${book._id}`}>View</a>
							</div>
						</div>
						<figcaption>
							<h4>{book.title}</h4>
							<p>By {book.author.name}</p>
								<Rating stars={book.rating} />
							</figcaption>
						</figure>
					</div>
				</li>
			))

		return(
			<ul>
				{bookList}
			</ul>
			)
		}
}
