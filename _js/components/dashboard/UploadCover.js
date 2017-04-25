import React from 'react';
import $ from 'jquery';

export default class UploadCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      coverFile: false,
    };
  }
  coverAdd = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (upload) => {
      this.setState({ coverFile: upload.target.result });
    };

    reader.readAsDataURL(file);
  }

  _onChange = (e) => {
		let state = {};
		state[e.target.name] = e.target.value;
		this.setState(state);
	}

  _onSubmit = (e) => {
    e.preventDefault();
    const postData = { title: this.state.title, cover: this.state.coverFile };
    $.post('/api/v1/mybooks', postData).then((data) => {
      window.location.href = "/dashboard";
    });
  }

  /*renderCover = () => {
    return (
      <div className="cover">
        <div className="flex">
          <h4>Cover</h4>
        </div>
      </div>
    );
  }*/

  render() {
    var cover = <div className="cover"> <div className="flex"> <h4>Cover</h4> </div> </div>;
		if(this.state.coverFile){
			cover = <div className="cover"><div className="flex"><img src={this.state.coverFile}/></div></div>
		}

    var bookTitle = 'Title Area';
		if(this.state.title){ bookTitle = this.state.title; }

    return (
			<ul className="field-list field-list-split">
				<li>
					<div className="copy">
						<p>Preview</p>
					</div>
					<div className="book-blocks book-blocks-single book-blocks-preview">
						<ul>
							<li>
								<div className="content-block content-block-book">
									<figure>
										{cover}
										<figcaption>
											<h4>{bookTitle}</h4>
											<p>By [Author Name]</p>
											<ul className="rating-display">
												<li></li>
												<li></li>
												<li></li>
												<li></li>
												<li></li>
											</ul>
										</figcaption>
									</figure>
								</div>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<div className="copy">
						<p>Add Basic Information</p>
						<form id="coverForm" onSubmit={this._onSubmit}>
							<ul className="inner-fields">
								<li>
									<label htmlFor="title">Book Title</label>
									<input id="title" name="title" type="text" onChange={this._onChange} value={this.state.title}/>
								</li>
								<li>
									<label htmlFor="cover">Upload Cover Art</label>
									<input id="cover" type="file" onChange={this.coverAdd}/>
									<small>
										Max size of 15 MB<br />
										Dimensions are X by X<br />
										Needs to be jpg, png, or gif
									</small>
									<button id="coverSubmit" type="submit" style={{display:'none'}}></button>
								</li>
							</ul>
						</form>
					</div>
				</li>
			</ul>
		);
  }
}
