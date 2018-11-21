'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 3000;

_app2.default.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});