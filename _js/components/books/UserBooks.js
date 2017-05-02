import React from 'react';

import Rating from '../dashboard/Rating';

// function sanitize(status) {
//   switch (status) {
//     case 0:
//       return 'Removed';
//     case 1:
//       return 'Pending';
//     case 2:
//       return 'Active';
//     default:
//       return 'N/A';
//   }
// }

const UserBooks = ({ books, author }) => (
  <ul>
    {books.map((book, index) => (
      <li key={index}>
        <div className="content-block content-block-book">
          <figure>
            <div
              className="cover"
              style={{
                backgroundImage: book.cover || "url('/assets/images/pending-cover-art.png')",
              }}
            >
              <div className="overlay">
                <a className="button button-red" href={`/books/${book._id}/edit`}>Edit</a>
              </div>
            </div>
            <figcaption>
              <h4>{book.title}</h4>
              <p>By {author}</p>
              {/* <ul className="rating-display">
                <li className="filled"></li>
                <li className="filled"></li>
                <li className="filled"></li>
                <li className="filled"></li>
                <li></li>
              </ul>*/}
              <Rating stars={book.rating} />
            </figcaption>
          </figure>
        </div>
      </li>
    ))}
  </ul>
);

export default UserBooks;
