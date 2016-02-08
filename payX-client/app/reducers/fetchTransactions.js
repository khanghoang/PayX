import {
FETCH_TRANSACTION,
FETCHING_TRANSACTION,
FETCHING_TRANSACTION_FAILED,
FETCHING_TRANSACTION_SUCCESSED,
} from '../actions/sendMoney';
import _ from 'lodash';

const sendMoneyReducer = (state = [], action) => {
  switch(action.type) {
    case FETCHING_TRANSACTION:
      return {...state, ...action.data};
      break;
    case SEND_MONEY_SUCCESSED:
      const transactions = [...state.transactions, ...actions.data.transactions];
      return {...state, ...{isLoading: false}, ...{transactions: transactions}};
      break;
    case CLEAR_SEND_MONEY:
      return {};
      break;
    default:
      return state;
  }
}

export default sendMoneyReducer;
