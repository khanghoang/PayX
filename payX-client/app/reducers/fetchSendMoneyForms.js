import {
  FETCHING_SEND_MONEY_FORM,
  FETCH_SEND_MONEY_FORM_FAILED,
  FETCH_SEND_MONEY_FORM_SUCCESSED
} from '../actions/fetchSendMoneyForm';

import _ from 'lodash';

const fetchSendMoneyFormReducer = (state = {}, action) => {
  let newState;
  switch(action.type) {
    case FETCHING_SEND_MONEY_FORM:
      return {...state, ...action.data};
      break;
    case FETCH_SEND_MONEY_FORM_FAILED:
      newState = {
        ...state,
        ...{isLoading: false},
        ...action.data,
        ...{error: null}
      };
      return newState;
      break;
    case FETCH_SEND_MONEY_FORM_SUCCESSED:
      newState = {
        ...state,
        ...{isLoading: false},
        ...action.data, // hs error object inside
      };
      return newState;
      break;
    default:
      return state;
  }
}

export default fetchTransactionsReducer;
