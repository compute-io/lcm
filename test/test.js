'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	lcm = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-lcm', function tests() {

	it( 'should export a function', function test() {
		expect( lcm ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				lcm( value );
			};
		}
	});

	it( 'should throw an error if not provided an array of integers', function test() {
		var values = [
			'5',
			5.245,
			null,
			undefined,
			NaN,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[i] ) ).to.throw( TypeError );
			expect( badValue2( values[i] ) ).to.throw( TypeError );
		}

		function badValue1( value ) {
			return function() {
				lcm( [ value, 4 ] );
			};
		}
		function badValue2( value ) {
			return function() {
				lcm( [ 4, value ] );
			};
		}
	});

	it( 'should return null is provided an empty array', function test() {
		assert.isNull( lcm([]) );
	});

	it( 'should compute the lcm', function test() {
		var data;

		data = [ 0, 0 ];
		assert.strictEqual( lcm( data ), 0 );

		data = [ 1, 0 ];
		assert.strictEqual( lcm( data ), 0 );

		data = [ 0, 1 ];
		assert.strictEqual( lcm( data ), 0 );

		data = [ 6, 4 ];
		assert.strictEqual( lcm( data ), 12 );

		data = [ 6, -4 ];
		assert.strictEqual( lcm( data ), 12 );

		data = [ -6, -4 ];
		assert.strictEqual( lcm( data ), 12 );

		data = [ 2, 8 ];
		assert.strictEqual( lcm( data ), 8 );

		data = [ 15, 20 ];
		assert.strictEqual( lcm( data ), 60 );

		data = [ 20, 15 ];
		assert.strictEqual( lcm( data ), 60 );

		data = [ 35, -21 ];
		assert.strictEqual( lcm( data ), 105 );

		data = [ 48, 18 ];
		assert.strictEqual( lcm( data ), 144 );

		data = [ 8, 12, 16 ];
		assert.strictEqual( lcm( data ), 48 );

		data = [ 25, -35, 95 ];
		assert.strictEqual( lcm( data ), 3325 );

		data = [ 95, -35, 25 ];
		assert.strictEqual( lcm( data ), 3325 );

		data = [ 1500, 750, 150000, 625 ];
		assert.strictEqual( lcm( data ), 150000 );
	});

});
