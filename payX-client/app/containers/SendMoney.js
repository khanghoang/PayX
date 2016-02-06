import React, {Component} from 'react';
import FieldContainer from '../containers/Field';

export default class SendMoney extends Component {

  constructor() {
    super();
    this.onValidChanged = this.onValidChanged.bind(this);
  }

  onValidChanged(e, isValue) {
  }

  render() {

    let emailRules = [
      {
        errorMessage: 'Email is not valid',
        validationFunc: (value) => {
          const emailRegex = new RegExp("^[a-zA-Z0-9äöüÄÖÜ_+.-]+@[a-zA-Z0-9äöüÄÖÜ][a-zA-Z0-9-äöüÄÖÜ.]+\\.([a-zA-Z]{2,6})$");
          return emailRegex.test(value);
        }
      },
      {
        errorMessage: 'This field is required',
        validationFunc: (value) => {
          return value.toString().length;
        }
      }
    ];

    return (
      <div>
        SendMoney
        <FieldContainer
          prefixText='to'
          inputType='text'
          rules={emailRules}
          isValid={this.onValidChanged}
        />
      </div>
    )
  }
}
