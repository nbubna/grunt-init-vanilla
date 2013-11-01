// PhantomJS doesn't support bind yet - https://github.com/ariya/phantomjs/issues/10522
if (typeof Function.prototype.bind != 'function') {
  if (console) {
    console.warn('Using shim for Function.prototype.bind!');
  }
  Function.prototype.bind = function() {
    var slice = Array.prototype.slice,
      fn = this,
      callWith = slice.call(arguments),
      bound = function() {
        return fn.call.apply(fn, callWith.concat(slice.call(arguments)));
      };
    bound.prototype = fn.prototype;
    return bound;
  };
}
