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
		var bookList = this.props.books.map((book, key) => {
			var newChapter = '';
			if(this.props.title == 'My Library'){
				if(book.last_viewed && book.last_viewed[this.props.user._id]){
					if(book.last_viewed[this.props.user._id] < book.updated_at){
						newChapter = <span className="new-chapter-badge" title='New Chapters' style={{display:'block', position:'absolute', top:'0.25rem', left:'0.25rem', backgroundColor: 'red', height: '1.25rem', width: '1.25rem', padding: '0.15rem 0', borderRadius: '1rem', color: 'white', lineHeight: '1em', textAlign: 'center', fontSize:'1em', cursor: 'pointer'}}>!</span>
					}
				}else{
					if(!book.last_viewed || !book.last_viewed[this.props.user._id]){
						newChapter = <span className="new-chapter-badge" title='New Chapters' style={{display:'block', position:'absolute', top:'0.25rem', left:'0.25rem', backgroundColor: 'red', height: '1.25rem', width: '1.25rem', padding: '0.15rem 0', borderRadius: '1rem', color: 'white', lineHeight: '1em', textAlign: 'center', fontSize:'1em', cursor: 'pointer'}}>!</span>
					}
				}	
			}
			return (
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
							{newChapter}
						</figure>
					</div>
				</li>
			)})

		return(
			<ul>
				{bookList}
			</ul>
			)
		}
}
