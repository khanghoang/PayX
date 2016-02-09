import React, { Component } from 'react';

export default class TransactionItem extends Component {

  constructor() {
    super();
    this.state = {
      isExpanded: false
    }
    this.onClickRow = this.onClickRow.bind(this);
  }

  onClickRow() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    const transaction = this.props.transaction;
    let createdAt = new Date(transaction.createdAt);
    const transactionDate = `${createdAt.getDate()}/${createdAt.getMonth()+1}/${createdAt.getFullYear()}`;
    const className = `transaction-item col-xs-12 ${this.props.index % 2 ? "even" : ""}`
    return (
      <div className={className} onClick={this.onClickRow}>
        <div className='col-xs-3'>{transactionDate}</div>
        <div className='col-xs-6 email-cell'>{this.props.transaction.to}</div>
        <div className='col-xs-3'>{this.props.transaction.currency.symbol + '' + this.props.transaction.amount}</div>
        {this.state.isExpanded &&
          <div className='col-xs-12 transaction-description'>
            <div className='col-xs-12'>
              <div className='col-xs-4 text-left'>
                To:
              </div>
              <div className='col-xs-8 text-left'>
                {transaction.to}
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='col-xs-4 text-left'>
                From:
              </div>
              <div className='col-xs-8 text-left'>
                {transaction.from}
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='col-xs-4 text-left'>
                PaymentType:
              </div>
              <div className='col-xs-8 text-left'>
                {transaction.paymentType}
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='col-xs-4 text-left'>
                Message:
              </div>
              <div className='col-xs-8 text-left'>
                {transaction.message}
              </div>
            </div>
          </div>
          }
      </div>
    );
  }
}
