import React, { Component } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = e => {
    const { handleCheckboxChange, label } = this.props;
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    handleCheckboxChange(e);
  }

  render() {
    const { label, name } = this.props;
    const { isChecked } = this.state;
    return (
      <div className="new-field">
        <input
          type="checkbox"
          value={label}
          id={label}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
          name={name}
        />
        <label htmlFor={label}>
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
