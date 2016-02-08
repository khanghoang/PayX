import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sendMoney from '../actions/sendMoney';
import { routeActions } from 'react-router-redux'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...sendMoney, ...routeActions}, dispatch);
}

function mapStateToProps(state) {
  return {
    response: state.sendMoneyReducer
  }
}

class SuccessfulPage extends Component {

  componentDidMount() {
    const {success} = this.props.response;
    if (!success) {
      this.props.push('/')
    }
  }

  render() {
    return (
      <div>
        {`${this.props.response.from} sent to ${this.props.response.to}
        ${this.props.response.currency.symbol}${this.props.response.amount} `}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessfulPage);
