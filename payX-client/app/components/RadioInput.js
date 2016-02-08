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
      value: defaultValue,
      valid: false
    });
  }

  onChange(value) {
    const self = this;
    this.setState({
      value: value,
      valid: true
    }, () => {
      // happen after
      self.props.onChange && self.props.onChange(self.props.name, value);
      self.props.isValid && self.props.isValid(true);
    });
  }

  render() {
    const options = this.props.datasource.map((item, idx) => {
      return (
        <button type="button" className="payment-type-option form-control btn btn-default"
          onClick={() => { this.onChange(item.value)}}>
          {item.displayString}
          {
            item.value === this.state.value &&
              <span className="fr glyphicon glyphicon-ok" aria-hidden="false"></span>
              }
          </button>
      );
    });

    return (
      <div className="payment-type-options radio btn-group-vertical" role="group">
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
