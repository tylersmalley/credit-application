//var assign = require('lodash/object/assign');
var Validator = require('../validator');
var BaseModel = require('./base');

var Application = {
  path: '/application',

  validations: {
    'first-name': {
      message: 'is required',
      required: true
    },
    'last-name': {
      message: 'is required',
      required: true
    },
    'address': {
      message: 'non PO Box is required',
      required: true,
      blacklist: new RegExp(/[PO.]*\s?B(ox)?.*\d+/i)
    },
    'ssn': {
      message: 'valid 9 digit SSN is required',
      required: true,
      pattern: new RegExp(/^\d{9}$/),
      blacklist: [
        '123456789',
        '987654321',
        '111111111',
        '222222222',
        '333333333',
        '444444444',
        '555555555',
        '666666666',
        '777777777',
        '888888888',
        '999999999',
        '000000000'
      ]
    },
    'email': {
      message: 'valid email address is required',
      required: true,
      pattern: new RegExp(/.+@.+\..+/)
    },
    'email-confirmation': {
      message: 'must match the email address',
      matches: 'email',
      required: true
    }
  }
};

var proto = Object.assign({}, BaseModel, Validator, Application);

module.exports = Object.create(proto);
