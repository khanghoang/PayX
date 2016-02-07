import {SENDING_MONEY} from '../actions/sendMoney';
import _ from 'lodash';

const sendMoneyReducer = (state = {}, action) => {
  switch(action.type) {
    case SENDING_MONEY:
      const newState = _.assign({}, state, action.data);
      return newState;
      break;
    default:
      return state;
  }
}

export default sendMoneyReducer;
