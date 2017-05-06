import React from 'react';
import { render } from 'react-dom';

import EditBookContainer from '../../containers/books/EditBookContainer';

const EditBookPage = () => (
  <EditBookContainer bookId={bookId} />
);

if (document.getElementById('edit-book')) {
  render(
    <EditBookPage />,
    document.getElementById('edit-book'),
  );
}