import React, { Component } from 'react';
import $ from 'jquery';
import TinyMCE from 'react-tinymce';

const apiUrl = `/api/v1`;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      number: null,
      content: '',
    };
  }
  
  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { bookId, chapterId } = this.props;
    fetch(`${apiUrl}/books/${bookId}/chapters/${chapterId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          name: res.data.name,
          number: res.data.number,
          content: res.data.content,
        });
      });
  }

  handleChange = e => {
    this.setState({ content: e.target.getContent() }, () => console.log(this.state));
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${apiUrl}/books/${this.props.bookId}/chapters/${this.props.chapterId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.name,
        number: this.state.number,
        content: this.state.content,
      }),
    })
    .then(res => res.json())
    .then(() => console.log('this worked'))
    .catch(err => console.log(err));
    // $.put(`/api/v1/books/${this.props.bookId}/chapters`, data).then(res => {
    //   if (res.status === "error") {
    //     alert(res.message);
    //   } else {
    //     console.log(true);
    //   }
    // });
  }

  render() {
    const { name, number, content } = this.state;
    const { bookId, chapterId } = this.props;
    return (
      <div className="content-block content-block-standard">
        <h1>{name}</h1>
        <TinyMCE
          content={`initial content for chapter ${chapterId}`}
          config={{
            plugins: 'autolink link image lists print preview',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
            theme: 'modern',
          }}
          onChange={this.handleChange}
        />
        <div className="submit-row submit-row-small">
          <div className="buttons">
            <button className="button button-gray">Delete</button>
            <button className="button" onClick={this.handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
