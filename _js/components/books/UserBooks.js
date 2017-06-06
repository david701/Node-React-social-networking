import React from 'react';
import $ from 'jQuery';
import Rating from '../dashboard/Rating';

const apiUrl = '/api/v1';

export default class UserBooks extends React.Component {
	unfollow = (bookId) => {
		$.ajax({
			url: `${apiUrl}/books/${bookId}/follow`,
			type: 'DELETE',
		}).then(res => {
			this.props.loadUserInfo(this.props.user._id)
		})
	}

	render(){
		var bookList = this.props.books.map((book, key) => (
			<li key={key}>
				<div className="content-block content-block-book">
					<figure>
						<div
							className="cover"
							style={{
								backgroundImage: book.cover ? "url("+book.cover+")" : book.status > 1 ? "url('/assets/images/default-cover-art.jpg')" : "url('/assets/images/pending-cover-art.jpg')",
							}}
							>
							<div className="overlay">
								<a className="button button-red" href={`/books/${book._id}`}>Preview</a>
								{this.props.library? <a className="button button-red" onClick={() => this.unfollow(book._id)}>Unfollow</a> :''}
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
				{this.props.title == 'My Books'?(<li>
						<a href="/dashboard/create/">
							<div className="content-block content-block-book">
								<figure>
									<div className="cover" style={{position: 'relative'}}>
										<div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '3em', opacity: '0.5'}}>+</div>
									</div>
									<figcaption>
										<h4>Add Book</h4>
									</figcaption>
								</figure>
							</div>
						</a>
					</li>):''}
				{bookList}
			</ul>
			)
		}
}
