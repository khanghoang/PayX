import React, {Component} from 'react';
import FieldContainer from '../containers/Field';
import Dropdown from '../components/Dropdown';
import _ from 'lodash';

export default class SendMoney extends Component {

  constructor() {
    super();
    this.onValidChanged = this.onValidChanged.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onClickSend = this.onClickSend.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      currency: 'usd',
      amount: null,
      to: null,
      message: null,
      paymentType: null, // 'SEND' or 'PAY'
      valid: false
    }
  }

  reset() {
    this.setState({
      currency: 'usd',
      amount: null,
      to: null,
      message: null,
      paymentType: null, // 'SEND' or 'PAY'
      valid: false
    });

    _.each([
      this.refs.dropdown,
      this.refs.to,
      this.refs.amount,
      this.refs.message
    ], (e) => { e.reset && e.reset() });
  }

  onValidChanged(e, isValue) {
    const allFieldsValid = _.reduce([
      this.refs.dropdown,
      this.refs.to,
      this.refs.amount,
      this.refs.message
    ], (total, e) => total && e.state.valid, true);
    this.setState({
      valid: allFieldsValid
    })
  }

  onValueChange(inputName, value) {
    switch(inputName) {
      case 'to':
        this.setState({to: value})
        break;
      case 'amount':
        this.setState({amount: value})
        break;
      case 'message':
        this.setState({message: value});
        break;
    }
  }

  onClickSend() {
  }

  onClickReset() {
    this.reset();
  }

  render() {

    const isRequiredRule =
      {
        errorMessage: 'This field is required',
        validationFunc: (value) => {
          return value.toString().length;
        }
      };

    const emailRules = [
      {
        errorMessage: 'Email is not valid',
        validationFunc: (value) => {
          const emailRegex = new RegExp("^[a-zA-Z0-9äöüÄÖÜ_+.-]+@[a-zA-Z0-9äöüÄÖÜ][a-zA-Z0-9-äöüÄÖÜ.]+\\.([a-zA-Z]{2,6})$");
          return emailRegex.test(value);
        }
      },
      isRequiredRule
    ];

    const amountRules = [
      {
        errorMessage: 'Not a valid number',
        validationFunc: (value) => {
          return _.isNumber(+value) && +value > 0;
        }
      },
      isRequiredRule
    ];

    const datasource = [
      {
        value: 'usd',
        displayString: 'USD'
      },
      {
        value: 'eur',
        displayString: 'EUR'
      },
      {
        value: 'jpy',
        displayString: 'JPY'
      }
    ];

    return (
      <div>
        SendMoney
        <FieldContainer
          prefixText='to'
          inputType='text'
          rules={emailRules}
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          name='to'
          ref='to'
        />
        <FieldContainer
          prefixText='amount'
          inputType='number'
          rules={amountRules}
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          name='amount'
          ref='amount'
        />
        <FieldContainer
          prefixText='Message (optional): '
          inputType='textarea'
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          name='message'
          ref='message'
        />
        <Dropdown
          datasource={datasource}
          onChange={(e) => console.log(e.target.value)}
          ref='dropdown'
        />
      <button
        type="button"
        onClick={this.onClickReset}>
        Reset
      </button>
      <button
        type="button"
        onClick={this.onClickSend}
        disabled={!this.state.valid}>
        Send
      </button>
      </div>
    )
  }
}
