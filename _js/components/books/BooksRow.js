import React from 'react';
import Book from './book';

const BookRow = props => (
	<div className={props.smallBooks?'book-blocks book-blocks-small':'book-blocks'}>
		{props.title?(<div className="title-row">
				<h3>{props.title}</h3>
				<a className="expand-control" href=".">All {props.title}</a>
		</div>): ''}
			{props.books?(
				<ul>
					{props.books.map((book, key)=>(
						<Book book={book} key={key} user={props.user} followBook={props.followBook} unfollowBook={props.unfollowBook}/>
					))}
				</ul>
			):''}
	</div>
)

export default BookRow;
