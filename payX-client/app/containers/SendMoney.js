import React, {Component} from 'react';
import FieldContainer from '../containers/Field';
import Dropdown from '../components/Dropdown';
import RadioInput from '../components/RadioInput';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
      currency: datasourceCurrencies[0],
      amount: null,
      to: null,
      message: null,
      paymentType: null, // 'SEND' or 'PAY'
      valid: false,
    }
  }

  componentDidMount() {
    this.reset();
    this.props.clearSendMoney();
  }

  componentWillReceiveProps(nextProps) {
    const {success} = nextProps.response;
    if (typeof success !== 'undefined') {
      if (!this.redirect) {
        this.redirect = true;
        this.props.push('/successfulPage');
      }
    }
  }

  reset() {
    this.setState({
      currency: datasourceCurrencies[0],
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
        this.setState({
          to: value,
          emailValid: this.refs.to.state.valid
        })
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
        this.setState({paymentType: value});
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
        <div className='loading row'>
          <div>
          loading...
          </div>
          <div className='loading-indicator col-xs-5 vcenter'></div>
        </div>
      );
    }

    const currencies = (
      <Dropdown
        datasource={datasourceCurrencies}
        isValid={this.onValidChanged}
        onChange={this.onValueChange}
        style={{'width': '80px'}}
        ref='dropdown'
        name='currency'
      />
    );

    const sendButtonClasses = 'form-control bottom-right-button ' + (!this.state.valid ? 'disabled' : 'btn-primary');

    const bottomButtons = [
      <input
        className='form-control bottom-left-button btn-warning'
        type="button"
        onClick={this.onClickReset}
        value='Reset'
      />,
      <input
        className={sendButtonClasses}
        type="button"
        onClick={this.onClickSend}
        disabled={!this.state.valid}
        value='Send'
      />
    ];

    const shouldAppear = this.state.emailValid ? "glyphicon-ok" : "";
    const validCheck = (
      <span className={"send-money-check input-group-addon glyphicon " + shouldAppear} aria-hidden="false"></span>
    );

    return (
      <div>
        <Header
          tittle='Send Money'
        />
        <FieldContainer
          prefixText='To'
          inputType='text'
          rules={emailRules}
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          className='vertical-padding-s send-money-email'
          name='to'
          ref='to'
          children={validCheck}
        />
        <FieldContainer
          prefixText={`Amount: ${this.state.currency.symbol} `}
          inputType='number'
          rules={amountRules}
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          className='vertical-padding-s currency'
          name='amount'
          ref='amount'
          children={currencies}
        />
        <FieldContainer
          prefixText='Message (optional): '
          inputType='textarea'
          isValid={this.onValidChanged}
          onValueChange={this.onValueChange}
          className='vertical-padding-s'
          name='message'
          ref='message'
        />
        <b>What's this payment for?</b>
        <RadioInput
          datasource={paymentTypes}
          isValid={this.onValidChanged}
          onChange={this.onValueChange}
          name='paymentType'
          ref='paymentType'
        />
      <Footer
        children={bottomButtons}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);
