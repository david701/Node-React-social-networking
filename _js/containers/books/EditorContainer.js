import React from 'react';

import Editor from '../../components/books/Editor';

const apiUrl = '/api/v1';

export default class EditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      content: '',
    };
  }

  componentDidMount() {
    this.loadChapterInfo();
  }

  componentDidUpdate(nextProps) {
    if (this.props.chapterId !== nextProps.chapterId) {
      this.loadChapterInfo();
    }
    return false;
  }

  loadChapterInfo = () => {
    const { bookId, chapterId } = this.props;
    fetch(`${apiUrl}/books/${bookId}/chapters/${chapterId}`)
      .then(res => res.json())
      .then(res => {
        const nextState = {
          ...this.state,
          name: res.data.name,
          number: res.data.number,
          content: res.data.content,
        };
        this.setState(nextState);
      });
  }

  handleChange = e => {
    const nextState = { ...this.state, content: e.target.getContent() };
    this.setState(nextState);
  }

  handleSubmit = e => {
    const { bookId, chapterId } = this.props;
    fetch(`${apiUrl}/books/${bookId}/chapters/${chapterId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        number: this.state.number,
        content: this.state.content,
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  render() {
    const { content, name } = this.state;
    return (
    <div>
      <Editor
        content={content}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        name={name}
      />
    </div>
    );
  }
}
