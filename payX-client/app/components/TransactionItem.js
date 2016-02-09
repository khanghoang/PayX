import React, { Component } from 'react';

export default class TransactionItem extends Component {
  render() {
    const transaction = this.props.transaction;
    let createdAt = new Date(transaction.createdAt);
    const transactionDate = `${createdAt.getDate()}/${createdAt.getMonth()+1}/${createdAt.getFullYear()}`;
    return (
      <tr scope='row' className='transaction-item'>
        <td>{transactionDate}</td>
        <td>{this.props.transaction.to}</td>
        <td>{this.props.transaction.currency.symbol + '' + this.props.transaction.amount}</td>
      </tr>
    );
  }
}
