import {
  SEND_MONEY,
  SENDING_MONEY,
  SEND_MONEY_SUCCESSED,
  SEND_MONEY_FAILED,
  CLEAR_SEND_MONEY,
} from '../actions/sendMoney';
import _ from 'lodash';

const sendMoneyReducer = (state = {}, action) => {
  switch(action.type) {
    case SENDING_MONEY:
      return {...state, ...action.data};
      break;
    case SEND_MONEY_SUCCESSED:
      return {...state, ...action.data};
      break;
    case CLEAR_SEND_MONEY:
      return {};
      break;
    default:
      return state;
  }
}

export default sendMoneyReducer;
