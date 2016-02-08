import React, { Component } from 'react';

export default class TransactionItem extends Component {
  render() {
    return (
      <div className='transaction-item'>
        <div>{this.props.transaction.createdAt.toString()}</div>
        <div>{this.props.transaction.to}</div>
        <div>{this.props.transaction.currency.symbol + '' + this.props.transaction.amount}</div>
      </div>
    );
  }
}
