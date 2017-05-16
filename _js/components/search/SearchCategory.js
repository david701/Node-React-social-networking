import React from 'react';

export default class SearchCategory extends React.Component {

  render() {
    const { label, name, val, deleteCategory } = this.props;
    return (
      <li key={val}>
        <input
          type="checkbox"
          value={label}
          checked="true"
          id={label}
        />
        <label htmlFor={label}>
          {label}
          <span onClick={() => deleteCategory(label)} style={{ float: 'right', color: 'white', marginRight: '7px' }}>X</span>
        </label>
      </li>
    );
  }
}

