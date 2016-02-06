import React, { Component } from 'react';

export default class Field extends Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: ''
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });

    this.props.onKeyChange && this.props.onKeyChange(e);
  }

  reset() {
    this.setState({
      value: ''
    });
  }

  render() {
    return (
      <div>
        <label>{this.props.prefixText}</label>
        <input
          type={this.props.inputType}
          onBlur={this.props.onBlur}
          onKeyUp={this.props.onKeyUp}
          onChange={this.onChange}
          onKeyPress={this.props.onKeyPress}
          value={this.state.value}
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
