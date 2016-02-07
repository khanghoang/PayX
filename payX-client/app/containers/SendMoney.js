import React, {Component} from 'react';
import FieldContainer from '../containers/Field';
import Dropdown from '../components/Dropdown';
import RadioInput from '../components/RadioInput';
import _ from 'lodash';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sendMoney from '../actions/sendMoney';
import { routeActions } from 'react-router-redux'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...sendMoney, ...routeActions}, dispatch);
}

function mapStateToProps(state) {
  return {
    response: state.sendMoneyReducer
  }
}

class SendMoney extends Component {

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
      valid: false,
    }
  }

  componentDidMount() {
    this.reset();
  }

  componentWillReceiveProps(nextProps) {
    const {success} = nextProps.response;
    if (success) {
      if (!this.redirect) {
        this.redirect = true;
        this.props.push('/successfulPage');
      }
    }
  }

  reset() {
    this.setState({
      currency: 'usd',
      amount: null,
      to: null,
      message: null,
      paymentType: null, // 'SEND' or 'PAY'
      valid: false,
    });

    _.each([
      this.refs.dropdown,
      this.refs.to,
      this.refs.amount,
      this.refs.message,
      this.refs.paymentType
    ], (e) => { e.reset && e.reset() });
  }

  onValidChanged(e, isValue) {
    const allFieldsValid = _.reduce([
      this.refs.to,
      this.refs.amount,
      this.refs.dropdown,
      this.refs.paymentType
    ], (total, e) => total && e.state.valid, true);

    this.setState({
      valid: allFieldsValid
    });
  }

  onValueChange(inputName, value) {
    switch(inputName) {
      case 'to':
        this.setState({to: value})
        break;
      case 'amount':
        this.setState({amount: value})
        break;
      case 'currency':
        this.setState({currency: value})
        break;
      case 'message':
        this.setState({message: value});
        break;
      case 'paymentType':
        this.setState({transactionType: value});
        break;
    }
  }

  onClickSend() {
    this.props.sendMoney(this.state);
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

    const datasourceCurrencies = [
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

    const paymentTypes = [
      {
        value: 'send',
        displayString: "I'm sending money to family or friend"
      },
      {
        value: 'pay',
        displayString: "I'm paying for goods or services"
      }
    ]

    let loading = null;

    if (this.props.response.isLoading) {
      loading = (
        <div>
          loading...
        </div>
      );
    }

    return (
      <div>
        {loading}
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
          datasource={datasourceCurrencies}
          onChange={this.onValueChange}
          ref='dropdown'
          name='currency'
        />
      <RadioInput
        datasource={paymentTypes}
        onChange={this.onValueChange}
        name='paymentType'
        ref='paymentType'
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

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);
