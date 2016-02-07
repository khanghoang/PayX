import React, {Component} from 'react';
import Field from '../components/Field';
import TextArea from '../components/TextArea';

export default class FieldContainer extends Component {

  constructor() {
    super();
    this.onValidateInput = this.onValidateInput.bind(this);
    this.state = {
      arrErrorMessages: [],
      valid: false,
      value: ''
    }
  }

  reset() {
    this.setState({
      arrErrorMessages: [],
      valid: false,
      value: ''
    });
    this.refs.input.reset();
  }

  onValidateInput(e) {
    const rules = this.props.rules;
    const value = e.target.value;
    const errorMessages = rules.filter((rule) => {
      if (rule.validationFunc && !rule.validationFunc(value)) {
        return rule;
      }
    }).map((rule) => {
      return rule.errorMessage;
    });

    if (errorMessages.length > 0) {
      this.setState({
        valid: false,
        arrErrorMessages: errorMessages,
        value: value
      });

      this.props.isValid && this.props.isValid(e, false);
    } else {
      this.setState({
        valid: true,
        arrErrorMessages: [],
        value: value
      });

      this.props.isValid && this.props.isValid(e, true);
    }

    this.props.onValueChange && this.props.onValueChange(this.props.name, value);
  }

  render() {

    const errorMessages = this.state.arrErrorMessages.map((message) => {
      return <div>{message}</div>
    });

    let renderObject = null;

    if (this.props.inputType === 'textarea') {
      renderObject = (
        <TextArea
          {...this.props}
          onBlur={this.onValidateInput}
          onChange={this.onValidateInput}
          onKeyPress={this.onValidateInput}
          onKeyUp={this.onValidateInput}
          ref="input"
        />
      );
    } else {
      renderObject = (
        <Field
          {...this.props}
          onBlur={this.onValidateInput}
          onChange={this.onValidateInput}
          onKeyPress={this.onValidateInput}
          onKeyUp={this.onValidateInput}
          ref="input"
        />
      );
    }

    return (
      <div>
        {renderObject}
        {errorMessages}
      </div>
    )
  }
}

FieldContainer.propTypes = {
  rules: React.PropTypes.arrayOf(React.PropTypes.object),
  prefixText: React.PropTypes.string,
  inputType: React.PropTypes.oneOf(['text', 'password']),
  onBlur: React.PropTypes.func,
  onKeyUp: React.PropTypes.func,
  onKeyChange: React.PropTypes.func,
  onKeyPress: React.PropTypes.func
}

FieldContainer.defaultProps = {
  rules: []
}

// const rules = [
//   {
//     errorMessage: 'errorMessage',
//     regex: '',
//     validationFunc: (value) => {
//       return boolean;
//     }
//   }
// ]
