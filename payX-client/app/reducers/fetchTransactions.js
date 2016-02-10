import {
  FETCH_TRANSACTION,
  FETCHING_TRANSACTION,
  FETCH_TRANSACTION_FAILED,
  FETCH_TRANSACTION_SUCCESSED,
  FLUSH_TRANSACTIONS
} from '../actions/fetchTransactions';
import _ from 'lodash';

const initialState = {
  transactions: []
}

const fetchTransactionsReducer = (state = initialState, action) => {
  let transactions = null;
  let newState = null;
  switch(action.type) {
    case FETCHING_TRANSACTION:
      return {...state, ...action.data};
      break;
    case FETCH_TRANSACTION_SUCCESSED:
      transactions = [...state.transactions, ...action.data.transactions];
      newState = {...state, ...{isLoading: false}, ...action.data, ...{transactions: transactions}};
      return newState;
      break;
    case FETCH_TRANSACTION_FAILED:
      newState = {
        ...state,
        ...{isLoading: false},
        ...action.data, // has error object inside
      };
      return newState;
      break;
    case FLUSH_TRANSACTIONS:
      return {...state, ...{transactions: []}}
      break;
    default:
      return state;
  }
}

export default fetchTransactionsReducer;
