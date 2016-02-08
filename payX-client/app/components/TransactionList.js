import React, {Component} from 'react';
import TransactionItem from './TransactionItem';

export default class TransactionList extends Component {
  render() {
    const rows = this.props.datasource.map((item, idx) => {
      return (
        <TransactionItem
          transaction={item}
          key={idx}
          index={idx}
        />
      )
    });
    return (
      <table className='table'>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
