import React, { Component } from 'react';

export default class Field extends Component {
  render() {
    return (
      <div>
        <label>{this.props.prefixText}</label>
        <input
          type={this.props.inputType}
          onBlur={this.props.onBlur}
          />
        </div>
    )
  }
}

Field.propTypes = {
  prefixText: React.PropTypes.string,
  inputType: React.PropTypes.oneOf(['text', 'password']),
  onBlur: React.PropTypes.func
}
