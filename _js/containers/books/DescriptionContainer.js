import React from 'react';

import Description from '../../components/books/Description';

const apiUrl = `/api/v1`;

export default class DescriptionContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: ''
    };
  }

  componentDidMount() {
    this.loadDescription();
  }

  loadDescription = () => {
    fetch(`${apiUrl}/books/${this.props.bookId}`)
      .then(res => res.json())
      .then(res => {
        const nextState = { ...this.state, description: res.data.description };
        this.setState(nextState);
      });
  }

  render() {
    return (
      <Description description={this.state.description} />
    );
  }
}