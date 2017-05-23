import React from 'react';
import Book from './book';

const BookRow = props => (
	<div className="book-blocks">
		{props.title?(<div className="title-row">
				<h3>{props.title}</h3>
				<a className="expand-control" href=".">All {props.title}</a>
		</div>): ''}
			{props.books?(
				<ul>
					{props.books.map((book, key)=>(
						<Book book={book} key={key}/>
					))}
				</ul>
			):''}
	</div>
)

export default BookRow;
