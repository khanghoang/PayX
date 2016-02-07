import React, { Component } from 'react';

export default class Dropdown extends Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      valid: true
    };
  }

  componentDidMount() {
    const value = this.props.datasource[0];
    this.setState({
      value: value.value
    });
    this.props.onChange && this.props.onChange(this.props.name, value);
  }

  reset() {
    const defaultValue = this.props.datasource ? this.props.datasource[0] : null;
    this.setState({
      value: defaultValue
    });
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });

    const value = e.target.value;
    const selectedItem = _.find(this.props.datasource, (item) => item.value === value);

    this.props.onChange && this.props.onChange(this.props.name, selectedItem);
  }

  render() {
    const options = this.props.datasource.map((item, idx) => {
      return <option value={item.value}>{item.displayString}</option>
    });

    return (
      <select className='form-control'
        {...this.props}
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
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired
}
