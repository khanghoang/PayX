import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sendMoney from '../actions/sendMoney';
import { routeActions } from 'react-router-redux'
import Footer from '../components/Footer';
import Header from '../components/Header';

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

  componentDidMount() {
    const {success} = this.props.response;
    if (!success) {
      this.props.push('/')
    }
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

    return (
      <div>
        <Header
          tittle='Send Money'
        />
        <div>
          {`${this.props.response.from} sent to ${this.props.response.to}
            ${this.props.response.currency.symbol}${this.props.response.amount} `}
        </div>
        <Footer
          children={bottomButtons}
          />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessfulPage);
