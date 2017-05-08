import React from 'react';

import DetailsContainer from './DetailsContainer';
import EditorContainer from './EditorContainer';
import TOCContainer from './TOCContainer';
import DescriptionContainer from './DescriptionContainer';

const apiUrl = '/api/v1';

export default class EditBookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChapter: null,
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
      <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-start' }}>
        <DetailsContainer bookId={this.props.bookId} length={this.state.chapters.length} />
        <div className="content-block content-block-standard-new" style={{ marginBottom: 20 }}>
          <div className="placeholder">
            <h4 className="temp-header">Ad Space</h4>
          </div>
        </div>
        <TOCContainer bookId={this.props.bookId} loadChapters={this.loadChapters} selectChapter={this.selectChapter} chapters={this.state.chapters} />
        <DescriptionContainer />
        {this.state.selectedChapter ? <EditorContainer bookId={this.props.bookId} chapterId={this.state.selectedChapter} /> : '' }
      </div>
    );
  }
}
