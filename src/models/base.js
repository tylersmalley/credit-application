var BaseModel = {
  /**
   * Path for API requests
   */

  path: '/',

  /**
   * Persists to server
   */

  save: function(callback) {
    var xhr = new XMLHttpRequest();
    var url = this.path;
    var data = this.values;

    console.log('save');

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
      var response;
      var error;

      try {
        response = JSON.parse(xhr.responseText);
      } catch(e) {
        console.warn('unable to parse response');
      }

      if (xhr.status !== 201) {
        error = 'unable to save';
      }

      if (callback) {
        callback(error, response);
      }
    };

    data['submitted-at'] = new Date();

    xhr.send(JSON.stringify(data));
  }
};

module.exports = BaseModel;
