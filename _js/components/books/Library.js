import React, { Component } from 'react';

import UserBooks from './UserBooks';

class Library extends Component {
  render() {
    const { books } = this.props;
    return (
      <div>
        <div className="title-row">
          <h1>My Library</h1>
          <a className="control" href=".">See All</a>
        </div>
        <UserBooks books={books} />
      </div>
    );
  }
}

export default Library;
