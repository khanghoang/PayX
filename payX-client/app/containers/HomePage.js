import React, {Component} from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

const HomePage = ({push, children}) => {

  const onClickSendMoney = () => {
    console.log('click send money');
    push('/sendMoney');
  }

  const onClickViewTransactions = () => {
    console.log('click view transactions');
    push('/viewTransactions');
  }

  return (
    <div className="HomePage">
      HomePage2
      <button
        type="button"
        onClick={onClickSendMoney}>
        Send money
      </button>
      <button
        type="button"
        onClick={onClickViewTransactions}>
        View transactions history
      </button>
    </div>
  )
}

export default connect(
  null,
  routeActions
)(HomePage)
