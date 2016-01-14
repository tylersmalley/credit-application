var ApplicationForm = require('./forms/application');
var ApplicationModel = require('./models/application');

var assert = require('./assert');

// mount application for functional testing
ApplicationForm.mount('app');

// debugging
window.ApplicationForm = ApplicationForm;
window.ApplicationModel = ApplicationModel;

// all fields are required
(function() {
  var model = Object.create(ApplicationModel);

  assert(model.error('first-name')).equal('is required');
  assert(Object.keys(model.errors())).equal(
    ["first-name", "last-name", "address", "ssn", "email", "email-confirmation"],
    'all fields to be required'
  );
})();

// validate email and email-confirmation
(function() {
  var model = Object.create(ApplicationModel);

  model.values.email = 'tylersmalley@me.com';

  assert(model.error('email')).equal(undefined);
  assert(model.error('email-confirmation')).equal('must match the email address');

  model.values['email-confirmation'] = model.values.email;
  assert(model.error('email-confirmation')).equal(undefined);
})();

// validate address
(function() {
  var model = Object.create(ApplicationModel);
  var invalid = ['P.O. Box 1720', 'PO Box 1720'];
  var valid = ['1720 SW 4th Ave', '1666 Gough St.'];

  invalid.forEach(function(address) {
    model.values.address = address;
    assert(model.error('address')).equal(
      'non PO Box is required',
      'address of ' + address + ' to be invalid'
    );
  });

  valid.forEach(function(address) {
    model.values.address = address;
    assert(model.error('address')).equal(
      undefined,
      'address of ' + address + ' to be valid'
    );
  });
})();

// validate ssn
(function() {
  var model = Object.create(ApplicationModel);
  var invalid = [
    '1',
    '12',
    '123',
    '1234',
    '12345',
    '123456',
    '1234567',
    '12345678',
    '123456789',
    '1234567890',
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
  ];
  var valid = [
    '123412345',
    '111111112'
  ];

  invalid.forEach(function(ssn) {
    model.values.ssn = ssn;
    assert(model.error('ssn')).equal(
      'valid 9 digit SSN is required',
      'ssn of ' + ssn + ' to be invalid'
    );
  });

  valid.forEach(function(ssn) {
    model.values.ssn = ssn;
    assert(model.error('ssn')).equal(
      undefined,
      'ssn of ' + ssn + ' to be valid'
    );
  });
})();
