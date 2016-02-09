import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sendMoney from '../actions/sendMoney';
import { routeActions } from 'react-router-redux'
import Footer from '../components/Footer';
import Header from '../components/Header';
import _ from 'lodash';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...sendMoney, ...routeActions}, dispatch);
}

function mapStateToProps(state) {
  return {
    response: state.sendMoneyReducer
  }
}

class SuccessfulPage extends Component {

  constructor() {
    super();
    this.onClickBackButton = this.onClickBackButton.bind(this);
    this.onClickViewTransactions = this.onClickViewTransactions.bind(this);
  }

  onClickBackButton() {
    this.props.goBack();
  }

  onClickViewTransactions() {
    this.props.push('/viewTransactions')
  }

  componentWillMount() {
    const {success} = this.props.response;
    if (typeof success === 'undefined') {
      this.props.push('/');
    }
  }

  successfulScreen() {
    const symbol = _.get(this.props, 'response.symbol');
    const to = _.get(this.props, 'response.to');
    const amount = _.get(this.props, 'response.amount');

    if (!symbol || !to || !amount) {
      return null;
    }

    return (
      <div>
        <b>{`You have sent ${symbol}${amount} to ${to}`}</b>
        <div className='row success-check vertical-padding-s'>
          <span className="glyphicon glyphicon-ok" aria-hidden="false"></span>
        </div>
      </div>
    )
  }

  errorScreen() {
    return (
      <div>
        <b>There is an error when sending the money</b>
        <br/>
        <b>Please go back and try again.</b>
      </div>
    )
  }

  render() {

    const bottomButtons = [
      <input
        className='form-control bottom-left-button btn-warning'
        type="button"
        onClick={this.onClickBackButton}
        value='Back'
      />,
      <input
        className='form-control bottom-right-button btn-primary'
        type="button"
        onClick={this.onClickViewTransactions}
        value='View Transactions'
      />
    ];

    const content = this.props.response.success ? this.successfulScreen() : this.errorScreen();

    return (
      <div>
        <Header
          tittle='Send Money'
        />
        <div className='success-page-container'>
          {content}
        </div>
        <Footer
          children={bottomButtons}
          />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessfulPage);
