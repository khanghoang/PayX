import {
  FETCH_TRANSACTION,
  FETCHING_TRANSACTION,
  FETCH_TRANSACTION_FAILED,
  FETCH_TRANSACTION_SUCCESSED,
} from '../actions/fetchTransactions';
import _ from 'lodash';

const initialState = {
  transactions: []
}

const fetchTransactionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_TRANSACTION:
      return {...state, ...action.data};
      break;
    case FETCH_TRANSACTION_SUCCESSED:
      const transactions = [...state.transactions, ...action.data.transactions];
      return {...state, ...{isLoading: false}, ...{transactions: transactions}};
      break;
    default:
      return state;
  }
}

export default fetchTransactionsReducer;
