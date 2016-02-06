import React, {Component} from 'react';
import FieldContainer from '../containers/Field';
import _ from 'lodash';

export default class SendMoney extends Component {

  constructor() {
    super();
    this.onValidChanged = this.onValidChanged.bind(this);
  }

  onValidChanged(e, isValue) {
  }

  render() {

    const isRequiredRule =
      {
        errorMessage: 'This field is required',
        validationFunc: (value) => {
          return value.toString().length;
        }
      };

    const emailRules = [
      {
        errorMessage: 'Email is not valid',
        validationFunc: (value) => {
          const emailRegex = new RegExp("^[a-zA-Z0-9äöüÄÖÜ_+.-]+@[a-zA-Z0-9äöüÄÖÜ][a-zA-Z0-9-äöüÄÖÜ.]+\\.([a-zA-Z]{2,6})$");
          return emailRegex.test(value);
        }
      },
      isRequiredRule
    ];

    const amountRules = [
      {
        errorMessage: 'Not a valid number',
        validationFunc: (value) => {
          return _.isNumber(+value) && +value > 0;
        }
      },
      isRequiredRule
    ]

    return (
      <div>
        SendMoney
        <FieldContainer
          prefixText='to'
          inputType='text'
          rules={emailRules}
          isValid={this.onValidChanged}
        />
        <FieldContainer
          prefixText='amount'
          inputType='number'
          rules={amountRules}
          isValid={this.onValidChanged}
        />
      </div>
    )
  }
}
