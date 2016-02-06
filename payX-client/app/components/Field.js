import React, { Component } from 'react';

export default class Field extends Component {
  render() {
    return (
      <div>
        <label>{this.props.prefixText}</label>
        <input
          type={this.props.inputType}
          onBlur={this.props.onBlur}
          onKeyUp={this.props.onKeyUp}
          onKeyChange={this.props.onKeyChange}
          onKeyPress={this.props.onKeyPress}
          />
        </div>
    )
  }
}

Field.propTypes = {
  prefixText: React.PropTypes.string,
  inputType: React.PropTypes.oneOf(['text', 'password', 'number']),
  onBlur: React.PropTypes.func
}
