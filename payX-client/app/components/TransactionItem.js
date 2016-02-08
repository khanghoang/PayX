import React, { Component } from 'react';

export default class TransactionItem extends Component {
  render() {
    const transaction = this.props.transaction;
    const transactionDate = `${transaction.createdAt.getDate()}/${transaction.createdAt.getMonth()+1}/${transaction.createdAt.getFullYear()}`;
    return (
      <tr scope='row' className='transaction-item'>
        <td>{transactionDate}</td>
        <td>{this.props.transaction.to}</td>
        <td>{this.props.transaction.currency.symbol + '' + this.props.transaction.amount}</td>
      </tr>
    );
  }
}
