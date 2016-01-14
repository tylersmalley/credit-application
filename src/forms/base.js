var ApplicationForm = {

  /**
   * Model associated with the form
   */

  model: null,

  /**
   * An HTML template containing a form tag
   */

  template: '',

  /**
   * Accessor to the element set when mounting
   */

  element: document.body,

  /**
   * Mounts the form to the DOM
   */

  mount: function(id) {
    var form = document.createElement('form');
    var self = this;
    var inputs;

    form.action = 'javascript:void(0);'
    form.innerHTML = this.template;
    form.addEventListener('submit', this.onSubmit.bind(this));

    this.element = document.getElementById(id);
    this.element.appendChild(form);

    inputs = this.input();

    for (var i=0; i < inputs.length; i++) {
      inputs[i].onblur = this.validateField.bind(this, inputs[i].name);
    }
  },

  /**
   * Handler for submittion of form
   */

  onSubmit: function() {
    var errors = this.validate();

    if (Object.keys(errors).length === 0) {
      this.toggleSubmitButton(true);

      this.model.save(function(error, response) {
        if (!error) {
          location.reload();
        } else {
          console.warn(error);
        }
      });
    }

    return false;
  },

  /**
   * Disables the submit button
   */

  toggleSubmitButton: function(disabled) {
    var submit = this.element.querySelector('button[type="submit"]');

    submit.disabled = disabled || !submit.disabled;
  },

  /**
   * Runs validation and updates DOM with errors
   */

  validate: function(key) {
    var values = this.values();
    var errors = {};
    var error;

    for (var key in values) {
      error = this.validateField(key);

      if (error) {
        errors[key] = error;
      }
    }

    return errors;
  },

  /**
   * Validates a single form field
   *
   * @param {String} key
   */

  validateField: function(key) {
    var fieldset = this.input(key).parentElement;
    var errorElement = fieldset.querySelector('small');
    var error;

    // update model
    this.model.values[key] = this.value(key)
    error = this.model.error(key);

    if (errorElement) {
      fieldset.className = '';
      fieldset.removeChild(errorElement);
    }

    if (!error) {
      return;
    }

    errorElement = document.createElement('small');
    errorElement.innerHTML = error;

    fieldset.className = 'warning'
    fieldset.appendChild(errorElement);

    return error;
  },

  /**
   * Retrieves one or more input fields
   *
   * @param {String} key - specific input field
   */

  input: function(key) {
    if (key) {
      return this.element.querySelector('input[name="' + key + '"]');
    } else {
      return this.element.querySelectorAll('input');
    }
  },

  /**
   * Retreives an input value
   *
   * @param {String} key
   */

  value: function(key) {
    var input = this.input(key);

    if (input) {
      return input.value;
    }
  },

  /**
   * Returns the values of the form
   */

  values: function() {
    var inputs = this.element.querySelectorAll('input');
    var values = {};

    for (var i = 0; i < inputs.length; i++) {
      values[inputs[i].name] = inputs[i].value;
    };

    return values;
  }
};

module.exports = ApplicationForm;
