import React, { Component } from 'react';

export default class TransactionItem extends Component {
  render() {
    return (
      <tr scope='row odd' className='transaction-item'>
        <td>{this.props.transaction.createdAt.toString()}</td>
        <td>{this.props.transaction.to}</td>
        <td>{this.props.transaction.currency.symbol + '' + this.props.transaction.amount}</td>
      </tr>
    );
  }
}
