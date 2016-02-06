import React, { Component } from 'react';

export default class Dropdown extends Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {};
  }

  onComponentUpdate(newState, newProps) {
    this.setState({
      value: newProps.datasource[0]
    });
  }

  reset() {
    this.setState({
      value: this.props.datasource[0]
    });
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });

    this.props.onChange && this.props.onChange(e);
  }

  render() {
    const options = this.props.datasource.map((item, idx) => {
      return <option value={item.value}>{item.displayString}</option>
    });

    return (
      <select
        onChange={this.onChange}
        value={this.state.value}
        >
        {options}
      </select>
    )
  }
}

Dropdown.propTypes = {
  datasource: React.PropTypes.arrayOf(React.PropTypes.object),
  onChange: React.PropTypes.func
}
