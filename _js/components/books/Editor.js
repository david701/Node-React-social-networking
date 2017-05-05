import React, { Component } from 'react';
import $ from 'jquery';
import TinyMCE from 'react-tinymce';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      number: null,
      content: null,
    };
  }
  
  componentDidMount() {
    // fetch(`/api/v1/books/${this.props.bookId}/chapters/${this.props.chapterId}`)
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({
    //       name: res.data.name,
    //       number: res.data.number,
    //       content: res.data.content,
    //     }, () => console.log(this.state));
    //   });
  }

  handleChange = e => {
    this.setState({ content: e.target.getContent() }, () => console.log(this.state.content));
  }

  handleSubmit = e => {
    const data = {
      name: 'test',
      number: this.state.number + 1,
      content: this.state.content,
    };
    e.preventDefault();
    $.post(`/api/v1/books/${this.props.bookId}/chapters`, data).then(res => {
      if (res.status === "error") {
        alert(res.message);
      } else {
        console.log(true);
      }
    });
  }

  render() {
    const { name, number, content } = this.state;
    const { bookId, chapterId } = this.props;
    return (
      <div className="content-block content-block-standard">
        <h1>{name}</h1>
        <TinyMCE
          content={chapterId}
          config={{
            selector: 'div',
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
