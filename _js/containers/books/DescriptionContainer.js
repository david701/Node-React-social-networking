import React from 'react';

import Description from '../../components/books/Description';

const apiUrl = `/api/v1`;

export default class DescriptionContainer extends React.Component {
  render() {
    return (
      <Description description={this.props.description} />
    );
  }
}
