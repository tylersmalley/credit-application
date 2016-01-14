module.exports = function assert(test) {

  function write(assertion, message) {
    var results = document.getElementById('results');
    var li = document.createElement('li');
    var success = document.getElementById('test-success-count');
    var total = document.getElementById('test-total-count');

    li.className = assertion ? 'test-pass' : 'test-fail';
    li.innerHTML = message;

    results.appendChild(li);

    if (assertion) {
      success.innerHTML = parseInt(success.innerHTML) + 1;
    }

    total.innerHTML = parseInt(total.innerHTML) + 1;
  }

  return {
    /**
     * Loosely equals
     */

    equal: function(value, message) {
      if (!message) {
        message = '<span class="value">' + test + '</span> ' +
          'to loosely equal <span class="value">' + value + '</span>';
      }
      write(JSON.stringify(test) == JSON.stringify(value), 'expect ' + message);
    }
  }
}
