import React from 'react';

function sanitize(status) {
  switch (status) {
    case 0:
      return 'Removed';
    case 1:
      return 'Pending';
    case 2:
      return 'Active';
    default:
      return 'N/A';
  }
}

const UserBooks = ({ books }) => (
  <ul>
    {books.map((book, index) => (
      <li key={index}>
        <h1>{book.title}</h1>
        {book.cover}
        {sanitize(book.status)}
        <a href="." className="content-block content-block-book">
          <figure>
            <div className="cover">
              <div className="overlay">
                <button className="button button-red" href=".">Unfollow</button>
              </div>
            </div>
            <figcaption>
              <h4>Title Area</h4>
              <p>By [Author Name]</p>
              <ul className="rating-display">
                <li className="filled"></li>
                <li className="filled"></li>
                <li className="filled"></li>
                <li className="filled"></li>
                <li></li>
              </ul>
            </figcaption>
          </figure>
        </a>
      </li>
    ))}
  </ul>
);

export default UserBooks;