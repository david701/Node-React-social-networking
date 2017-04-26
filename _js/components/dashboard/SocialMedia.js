import React, { Component } from 'React';

export default class SocialMedia extends Component {
  state = {
    social_media: {
        website: 'https://',
        good_reads: 'https://',
    		amazon: 'https://',
    		wordpress: 'https://',
    		facebook: 'https://',
    		twitter: 'https://'
      }
  };

  _handleChange = (e) => {
    this.setState({
      social_media: {
        ...this.state.social_media,
        [e.target.id]: e.target.value,
      }
    });
  }

  render() {
    const { sources } = this.props;
    return (
      <ul className="field-list">
        {sources.map((source, index) => (
          <li key={index}>
            <div className="title">
              <label htmlFor={source.slug}>Your {source.sanitized} URL</label>
              <span className="help-text">Invalid Url</span>
            </div>
            <input
              id={source.slug}
              name={"social_media." + source.slug}
              onChange={(e) => this._handleChange(e)}
              type="text"
              value={this.state.social_media[source.slug]}
            />
          </li>
        ))}
      </ul>
    );
  }
}