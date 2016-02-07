export const datasourceCurrencies = [
  {
    value: 'usd',
    displayString: 'USD',
    symbol: '$'
  },
  {
    value: 'eur',
    displayString: 'EUR',
    symbol: '€'
  },
  {
    value: 'jpy',
    displayString: 'JPY',
    symbol: '¥'
  }
];

export const paymentTypes = [
  {
    value: 'send',
    displayString: "I'm sending money to family or friend"
  },
  {
    value: 'pay',
    displayString: "I'm paying for goods or services"
  }
]

export const isRequiredRule =
  {
  errorMessage: 'This field is required',
  validationFunc: (value) => {
    return value.toString(require).length;
  }
};

export const emailRules = [
  {
    errorMessage: 'Email is not valid',
    validationFunc: (value) => {
      const emailRegex = new RegExp("^[a-zA-Z0-9äöüÄÖÜ_+.-]+@[a-zA-Z0-9äöüÄÖÜ][a-zA-Z0-9-äöüÄÖÜ.]+\\.([a-zA-Z]{2,6})$");
      return emailRegex.test(value);
    }
  },
  isRequiredRule
];

export const amountRules = [
  {
    errorMessage: 'Not a valid number',
    validationFunc: (value) => {
      return _.isNumber(+value) && +value > 0;
    }
  },
  isRequiredRule
];
