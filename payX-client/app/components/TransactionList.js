import React, {Component} from 'react';
import TransactionItem from './TransactionItem';

export default class TransactionList extends Component {
  render() {
    const rows = this.props.datasource.map((item) => {
      return (
        <TransactionItem
          transaction={item}
        />
      )
    });
    return (
      <div>
        {rows}
      </div>
    );
  }
}
