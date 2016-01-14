var ApplicationForm = require('./forms/application');
ApplicationForm.mount('app');

// polyfills, oh IE
require('./polyfills/object.assign');

window.ApplicationForm = ApplicationForm;
