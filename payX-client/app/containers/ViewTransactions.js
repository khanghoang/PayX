import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fetchTransactions from '../actions/fetchTransactions';
import { routeActions } from 'react-router-redux'
import Footer from '../components/Footer';
import Header from '../components/Header';
import TransactionList from '../components/TransactionList';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...fetchTransactions, ...routeActions}, dispatch);
}

function mapStateToProps(state) {
  return {
    data: state.fetchTransactionsReducer
  }
}

class ViewTransactions extends Component {

  constructor() {
    super();
    this.onClickBackButton = this.onClickBackButton.bind(this);
  }

  componentWillUpdate(newState, newProps) {
    // debugger;
  }

  componentDidMount() {
    // debugger;
    this.props.fetchTransactions();
  }

  onClickBackButton() {
    this.props.push('/');
  }

  render() {
    const bottomButton = [
      <input
        className='form-control btn-warning'
        type="button"
        onClick={this.onClickBackButton}
        value='Back'
      />
    ];

    return (
      <div>
        <Header
          tittle='Transactions History'
        />
        <TransactionList
          datasource={this.props.data.transactions}
          />
          {this.props.data.isLoading && (
            <div>
              Loading...
            </div>
          )}
        <Footer
          children={bottomButton}
          />
      </div>
    )
  }
}

ViewTransactions.defaultProps = {
  data: {
    transactions: []
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTransactions);
