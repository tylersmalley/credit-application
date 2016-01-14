var Validator = {

  /**
   * Default error message
   */

  defaultMessage: 'is not valid',

  /**
   * Validations to run against the form
   *
   * Example:
   *  email: {
   *    required: true,
   *    pattern: /.+@.+\..+/,
   *    message: 'valid email address is required'
   *  },
   *  email-confirmation: {
   *    matches: 'email',
   *    required: true,
   *    message: 'must match the email address'
   *  },
   *
   * Available validations:
   *  - required: Boolean
   *  - pattern: Regex
   *  - blacklist: Array
   *  - matches: String
   *
   * @returns {Object} - Invalid form keys
   */

  validations: {},

  /**
   * Values to be validated against
   */

  values: {},

  /**
   * All errors
   */

  errors: function() {
    var invalid = {};

    for (var name in this.validations) {
      var error = this.error(name);

      if (error) {
        invalid[name] = error;
      }
    }

    return invalid;
  },

  /**
   * Provides an error message for a single element
   *
   * @param {String} key
   * @return {String|null} returns null or message
   */

  error: function(key) {
    var v = this.validations[key];
    var value = this.values[key];

    // value is required
    if (v.required === true && (!value || value.length === 0)) {
      return v.message || this.defaultMessage;
    }

    if (!value) {
      return;
    }

    // must match a pattern
    if (v.pattern && value && !value.match(v.pattern)) {
      return v.message || this.defaultMessage;
    }

    // blacklisted RegExp
    if (value && v.blacklist instanceof RegExp && value.match(v.blacklist)) {
      return v.message || this.defaultMessage;
    }

    // blacklisted Array
    if (v.blacklist instanceof Array && v.blacklist.indexOf(value) >= 0) {
      return v.message || this.defaultMessage;
    }

    // must match another key
    if (v.matches && this.values[v.matches] !== value) {
      return v.message || this.defaultMessage;
    }
  }
};

module.exports = Validator;
