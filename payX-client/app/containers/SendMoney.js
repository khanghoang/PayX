import React, {Component} from 'react';
import FieldContainer from '../containers/Field';
import Dropdown from '../components/Dropdown';
import RadioInput from '../components/RadioInput';
import Header from '../components/Header';
import _ from 'lodash';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sendMoney from '../actions/sendMoney';
import { routeActions } from 'react-router-redux'
import {
  datasourceCurrencies,
  paymentTypes,
  isRequiredRule,
  emailRules,
  amountRules
} from '../data/datasouce';

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

    let loading = null;

    if (this.props.response.isLoading) {
      loading = (
        <div>
          loading...
        </div>
      );
    }

    const currencies = (
      <Dropdown
        datasource={datasourceCurrencies}
        onChange={this.onValueChange}
        style={{'width': '80px'}}
        ref='dropdown'
        name='currency'
      />
    );

    return (
      <div>
        <Header
          tittle='Send Money'
        />
        {loading}
        <FieldContainer
          prefixText='To'
          inputType='text'
          rules={emailRules}
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          name='to'
          ref='to'
        />
        <FieldContainer
          prefixText={`Amount: ${this.state.currency}`}
          inputType='number'
          rules={amountRules}
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          name='amount'
          ref='amount'
          children={currencies}
        />
        <FieldContainer
          prefixText='Message (optional): '
          inputType='textarea'
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          name='message'
          ref='message'
        />
        <div className="btn-group-vertical" role="group" aria-label="...">
          <RadioInput
            datasource={paymentTypes}
            onChange={this.onValueChange}
            name='paymentType'
            ref='paymentType'
          />
        </div>
      <input
        className='form-control'
        type="button"
        onClick={this.onClickReset}
        value='Reset'
      />
      <input
        className='form-control'
        type="button"
        onClick={this.onClickSend}
        disabled={!this.state.valid}
        value='Send'
      />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);
