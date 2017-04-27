import React from 'react';

const UploadCover = props => {
  const { author, title, coverFile, handleChange, coverAdd } = props;

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
                    <Cover title={title} coverFile={coverFile} />
                    <Caption title={title} />
                  </figure>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Information
            cover={coverFile}
            title={title}
            handleChange={handleChange}
            coverAdd={coverAdd}
          />
        </li>
      </ul>
    </div>
  );
}

const Caption = ({ title, author = "Kjartan", rating }) => (
  <figcaption>
    <BookTitle title={title} />
    <AuthorName author={author} />
    <Rating stars={5} />
  </figcaption>
);

const Cover = ({ title, coverFile }) => {
  if (coverFile) {
    return (
      <div className="cover">
        <div className="flex">
          <img src={coverFile} />
        </div>
      </div>
    );
  } else {
      return (
        <div className="cover">
          <div className="flex">{title ? title : "Cover"}</div>
        </div>
      );
  }
}

const BookTitle = ({ title }) => <h4>{title ? title : "Title Area"}</h4>;
const AuthorName = ({ author }) => <p>by {author ? author : "[Author Name]"}</p>;

const Rating = ({ stars = 5 }) => {
  let starsRated = [];
  for (let i = 0; i < stars; i++) {
    starsRated.push(<li key={i}></li>)
  }
  return (
    <ul className="rating-display">
      {starsRated}
    </ul>
  );
};

const Information = props => {
  const { title, coverFile, handleChange, coverAdd } = props;

  return (
    <div className="copy">
      <p>Add Basic Information</p>
      <form id="coverForm">
        <ul className="inner-fields">
          <li>
            <label htmlFor="title">Book Title</label>
            <input id="title" name="title" type="text" onChange={handleChange} value={title} />
          </li>
          <li>
            <label htmlFor="cover">Upload Cover Art</label>
            <input id="cover" type="file" onChange={coverAdd} />
            <small>
              Max size of 15 MB<br />
              Dimensions are X by X<br />
              Needs to be jpg, png, or gif
            </small>
            <button id="coverSubmit" type="submit" style={{ display: 'none' }} />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default UploadCover;
