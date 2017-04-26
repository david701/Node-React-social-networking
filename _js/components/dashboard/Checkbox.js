import React, { Component } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;
    return (
      <div className="field">
        <input
          type="checkbox"
          value={label}
          id={label}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        <label htmlFor={label}>
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
