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
      chapters: []
    };
  }

  componentDidMount() {
    this.loadChapters();
  }

  loadChapters = () => {
    fetch(`${apiUrl}/books/${bookId}/chapters`)
      .then(res => res.json())
      .then(res => {
        const nextState= { ...this.state, chapters: res.data };
        this.setState(nextState);
      });
  }

  selectChapter = id => {
    const nextState = { ...this.state, selectedChapter: id.toString() };
    this.setState(nextState);
  }

  render() {
    return (
      <div>
        <DetailsContainer bookId={this.props.bookId} length={this.state.chapters.length} />
        <TOCContainer bookId={this.props.bookId} loadChapters={this.loadChapters} selectChapter={this.selectChapter} chapters={this.state.chapters} />
        <EditorContainer bookId={this.props.bookId} chapterId={this.state.selectedChapter} />
      </div>
    );
  }
}
