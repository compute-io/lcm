/**
*
*	COMPUTE: lcm
*
*
*	DESCRIPTION:
*		- Computes the least common multiple (lcm).
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


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
	if ( !isInteger( a ) || !isInteger( b ) ) {
		throw new TypeError( 'lcm()::invalid input argument. Must provide integers.' );
	}
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
* FUNCTION: lcm( arr )
*	Computes the least common multiple (lcm).
*
* @param {Array} arr - array of integers
* @returns {Number|null} least common multiple or null
*/
function lcm( arr ) {
	var len, a, b, c;
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'lcm()::invalid input argument. Must provide an array.' );
	}
	len = arr.length;
	if ( !len ) {
		return null;
	}
	// Exploit the fact that the lcm is an associative function...
	a = arr[ 0 ];
	for ( var i = 1; i < len; i++ ) {
		b = arr[ i ];
		if ( a === 0 || b === 0 ) {
			return 0;
		}
		if ( a < 0 ) {
			a = -a;
		}
		if ( b < 0 ) {
			b = -b;
		}
		c = gcd( a, b );
		a = ( a/c ) * b;
	}
	return a;
} // end FUNCTION lcm()


// EXPORTS //

module.exports = lcm;
