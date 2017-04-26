import React from 'React';

const SocialMedia = props => {

  const _handleChange = e => {
    props.onUrlChange(e);
  }

  const { sources } = props;

  return (
    <div>
      <h4><span>Step 4.</span> Where is your book published?</h4>
      <ul className="field-list">
        {Object.keys(sources).map((source, index) => {
          return (
            <li key={index}>
              <div className="title">
                <label htmlFor={source}>Your {source} URL</label>
                <span className="help-text">Invalid Url</span>
              </div>
              <input
                id={source}
                name={"social_media." + source}
                onChange={(e) => _handleChange(e)}
                type="text"
                value={sources[source]}
              />
            </li>
          );
        })}
      </ul>
      <hr />
    </div>
  );
}

export default SocialMedia;