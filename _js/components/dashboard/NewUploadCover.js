import React from 'react';

const UploadCover = props => {
  const { title, coverFile, handleChange, handleCover } = props;

  const _onSubmit = e => {
    e.preventDefault();
    const postData = { title: title, cover: coverFile };
    $.post('/api/v1/mybooks', postData).then((data) => {
      window.location.href = "/dashboard";
    });
  }

  return (
    <div>
      <h4><span>Step 1.</span> Upload Cover Art</h4>
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
                    {coverFile ? coverFile : "Cover"}
                    <figcaption>
                      <h4>{title ? title : "Book Title"}</h4>
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
            <form id="coverForm" onSubmit={_onSubmit}>
              <ul className="inner-fields">
                <li>
                  <label htmlFor="title">Book Title</label>
                  <input id="title" name="title" type="text" onChange={handleChange} value={title} />
                </li>
                <li>
                  <label htmlFor="cover">Upload Cover Art</label>
                  <input id="cover" type="file" onChange={handleCover} />
                  <small>
                    Max size of 15 MB<br />
                    Dimensions are X by X<br />
                    Needs to be jpg, png, or gif
									</small>
                  <button id="coverSubmit" type="submit" style={{ display: 'none' }}></button>
                </li>
              </ul>
            </form>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UploadCover;
