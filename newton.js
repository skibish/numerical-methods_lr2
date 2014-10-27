'use strict';

var x = [-3.2, -2.1, 0.4, 0.7, 2, 2.5, 2.777];
var y = [10, -2, 0, -7, 7, 0, 0];

var delt = []; while(delt.push([]) < y.length - 1);

/**
 * Calculate coefficients of Newton polynomial
 *
 * @param  {Array}  x    - Array of x points
 * @param  {Array}  y    - Array of y points
 * x and y must be the same length
 * @return {Array}       - Array of coefficients
 */
function coeff(x, y) {
  var n = y.length;
  var c = new Array(n);

  c[0] = y[0];

  for (var j = 1; j < n; j++) {
    for (var i = 0; i < n - j; i++) {
      y[i] = (y[i + 1] - y[i]) / (x[i + j] - x[i]);
      c[j] = y[0];

      delt[j-1][i] = y[i];
    }
  }

  delt[0][0] = c[0];

  return c;
}

var c = coeff(x, y);

/**
 * Calculate x value with Newton polynomial
 *
 * @param  {Number} xtc  - x point to calculate value for
 * @return {Number}      - y
 */
function newton(xtc) {

  var n = y.length;

  var s = c[0],
    mult = 1;

  for (var i = 1; i < n; i++) {
    mult = mult * (xtc - x[i - 1]);
    s += c[i] * mult;
  }

  return s;
}

/**
 * Generate many point in range [-4, 3.5] with step 0.1
 *
 * @return {Array, Array} - return two arrays: a[0] are x values and a[1] are y values.
 */
function generateForNewton() {

  var values = [[],[]];

  for (var i = -4; i < 3.5; i += 0.1) {
    values[0].push(i);
    values[1].push(newton(i));
  }

  return values;
}
