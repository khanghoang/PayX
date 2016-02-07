import React, { Component } from 'react';

export default class RadioInput extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      valid: false
    };
  }

  onComponentUpdate(newState, newProps) {
    this.setState({
      value: null
    });
  }

  reset() {
    const defaultValue = this.props.datasource ? this.props.datasource[0] : null;
    this.setState({
      value: defaultValue
    });
  }

  onChange(e) {
    const self = this;
    const value = e.target.value;
    this.setState({
      value: e.target.value,
      valid: true
    }, () => {
      // happen after
      self.props.onChange && self.props.onChange(self.props.name, value)
    });
    ;
  }

  render() {
    const options = this.props.datasource.map((item, idx) => {
      return (
        <div>
          <input
            type='radio'
            name={this.props.name}
            onChange={this.onChange}
            value={item.value}
            checked={item.value === this.state.value}
            />{item.displayString}
        </div>
          );
    });

    return (
      <div>
        {options}
      </div>
    );
  }
}

RadioInput.propTypes = {
  datasource: React.PropTypes.arrayOf(React.PropTypes.object),
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired
}
