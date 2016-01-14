var fs = require('fs');

var BaseForm = require('../base');
var ApplicationModel = require('../../models/application');

var Form = Object.create(BaseForm);

Form.template = fs.readFileSync(__dirname + '/template.html', 'utf8');
Form.model = ApplicationModel;

module.exports = Form;
