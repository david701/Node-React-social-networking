import React from 'react';

import DetailsContainer from './DetailsContainer';
import EditorContainer from './EditorContainer';
import TOCContainer from './TOCContainer';

const apiUrl = '/api/v1';

export default class EditBookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChapter: 1,
    };
  }

  selectChapter = id => {
    const nextState = { ...this.state, selectedChapter: id.toString() };
    this.setState(nextState);
  }

  render() {
    return (
      <div>
        <DetailsContainer />
        <TOCContainer bookId={this.props.bookId} selectChapter={this.selectChapter} />
        <EditorContainer bookId={this.props.bookId} chapterId={this.state.selectedChapter} />
      </div>
    );
  }
}
