angular.module('calcApp', [])

.directive('calculator', function() {
  return {
    restrict: 'EA',
    scope: true,
    templateUrl: '/calculator.html',
    link: function(scope, element, attr) {
      var buffer = '';
      var cmd;

      scope.value = '';

      scope.num = function(num) {
        if (cmd) {
          buffer += num;
        } else {
          scope.value += num;
        }
      };

      scope.negate = function() {
        var neg = function(val) { return '' + (-1 * val); };
        if (buffer) {
          buffer = neg(buffer);
        } else {
          scope.value = neg(scope.value);
        }
      };

      scope.op = function(op) {
        if (cmd) {
          scope.compute();
        }
        if (op === '+')      cmd = function(x,y) { return x+y; }
        else if (op === '-') cmd = function(x,y) { return x-y; }
        else if (op === '/') cmd = function(x,y) { return x/y; }
        else if (op === '*') cmd = function(x,y) { return x*y; }
      };

      scope.clear = function() {
        scope.value = '';
        buffer = '';
      };

      scope.compute = function() {
        if (cmd) {
          scope.value = cmd(1 * scope.value, 1 * buffer);
          buffer = '';
          cmd = undefined;
        }
      };
    }
  }
});