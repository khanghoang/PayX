import ReactDOM from 'react-dom';
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
    this.handleScroll = this.handleScroll.bind(this);
    this.onClickTryLoadAgain = this.onClickTryLoadAgain.bind(this);
  }

  componentDidMount() {
    this.props.fetchTransactions(this.props.data.current_page, 20);
    this.scrollDOMObject = ReactDOM.findDOMNode(this.refs.scrollNode);
    this.scrollDOMObject.addEventListener('scroll', _.throttle(this.handleScroll, 1000));
  }

  componentWillUnmount() {
    this.scrollDOMObject.removeEventListener('scroll', this.handleScroll);
    this.props.flushTransactionCache();
  }

  handleScroll(e) {
    const threshold = 300; //px
    const body = e.srcElement;
    const scrollTop = body.scrollTop;
    const frameHeight = body.offsetHeight;
    const totalHeight = body.scrollHeight;
    const hasNextPage = this.props.data.current_page < this.props.data.total_pages;

    if (scrollTop + frameHeight + threshold > totalHeight
        && !this.props.data.isLoading
        && hasNextPage)
      {
      this.props.fetchTransactions(this.props.data.current_page, 20);
    }

    // console.log(`scrollTop ${scrollTop} window height ${frameHeight} total height ${totalHeight}`);
  }

  onClickTryLoadAgain() {
    const hasNextPage = this.props.data.current_page < this.props.data.total_pages;
    if (hasNextPage) {
      this.props.fetchTransactions(this.props.data.current_page, 20);
    }
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
        <div className='transactions-history' ref='scrollNode'>
          <TransactionList
            datasource={this.props.data.transactions || []}/>
          {this.props.data.isLoading && (
            <div className='transactions-list-load-more'>
              Loading...
            </div>
          )}
          {(this.props.data.error && !this.props.data.isLoading) && (
            <div
              className='transactions-list-load-more'
              onClick={this.onClickTryLoadAgain}>
              There is an error when loading data
              <br/>
              Please click here to try again
            </div>
          )}
        </div>
        <Footer
          children={bottomButton}
          />
      </div>
    )
  }
}

ViewTransactions.defaultProps = {
  data: {
    transactions: [],
    current_page: 1,
    // in case of the first time it loads and fails
    // we need to set it to 2 to make the try to load more
    // button works
    total_pages: 2
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTransactions);
