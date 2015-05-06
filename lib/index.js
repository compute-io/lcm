'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isInteger = require( 'validate.io-integer' ),
	isFunction = require( 'validate.io-function' );


// FUNCTIONS //

/**
* FUNCTION: gcd( a, b )
*	Computes the greatest common divisor of two integers `a` and `b`.
*
* @param {Number} a
* @param {Number} b
* @returns {Number} greatest common divisor
*/
function gcd( a, b ) {
	// [0] Simple cases...
	if ( a === b ) {
		return a;
	}
	// [1] Look for factors of 2...
	if ( a % 2 === 0 ) { // is even
		if ( b % 2 === 1 ) { // is odd
			return gcd( a/2, b );
		}
		// both even...
		return 2 * gcd( a/2, b/2 );
	}
	if ( b % 2 === 0 ) {
		return gcd( a, b/2 );
	}
	// [2] Reduce larger argument...
	if ( a > b ) {
		return gcd( (a-b)/2, b );
	}
	return gcd( (b-a)/2, a );
} // end FUNCTION gcd()


// LEAST COMMON MULTIPLE //

/**
* FUNCTION: lcm( arr[, clbk] )
*	Computes the least common multiple (lcm).
*
* @param {Number[]} arr - input array of integers
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number|Null} least common multiple or null
*/
function lcm( arr, clbk ) {
	var len, a, b, c, i;
	if ( !isArray( arr ) ) {
		throw new TypeError( 'lcm()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'lcm()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}
	len = arr.length;
	if ( len < 2 ) {
		return null;
	}
	// Exploit the fact that the lcm is an associative function...
	if ( clbk ) {
		a = clbk( arr[ 0 ], 0 );
		if ( !isInteger( a ) ) {
			throw new TypeError( 'lcm()::invalid input argument. Accessed array values must be integers. Value: `' + a + '`.' );
		}
		if ( a === 0 ) {
			return 0;
		}
		if ( a < 0 ) {
			a = -a;
		}
		for ( i = 1; i < len; i++ ) {
			b = clbk( arr[ i ], i );
			if ( !isInteger( b ) ) {
				throw new TypeError( 'lcm()::invalid input argument. Accessed array values must be integers. Value: `' + b + '`.' );
			}
			if ( b === 0 ) {
				return 0;
			}
			if ( b < 0 ) {
				b = -b;
			}
			c = gcd( a, b );
			a = ( a/c ) * b;
		}
	} else {
		a = arr[ 0 ];
		if ( !isInteger( a ) ) {
			throw new TypeError( 'lcm()::invalid input argument. Accessed array values must be integers. Value: `' + a + '`.' );
		}
		if ( a === 0 ) {
			return 0;
		}
		if ( a < 0 ) {
			a = -a;
		}
		for ( i = 1; i < len; i++ ) {
			b = arr[ i ];
			if ( !isInteger( b ) ) {
				throw new TypeError( 'lcm()::invalid input argument. Accessed array values must be integers. Value: `' + b + '`.' );
			}
			if ( b === 0 ) {
				return 0;
			}
			if ( b < 0 ) {
				b = -b;
			}
			c = gcd( a, b );
			a = ( a/c ) * b;
		}
	}
	return a;
} // end FUNCTION lcm()


// EXPORTS //

module.exports = lcm;
