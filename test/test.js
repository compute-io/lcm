/* global require, describe, it */
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

	it( 'should throw an error if not provided an integer array', function test() {
		var values = [
			'5',
			null,
			undefined,
			NaN,
			{},
			function(){},
			[ Math.PI, 2 ],
			[ '1', 2 ],
			[ 1, Math.PI ],
			[ 1, '2' ],
			[ 1, NaN ],
			[ 1, null ],
			[ [], 1 ],
			[ {}, 1 ],
			[ null, 1 ]
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

	it( 'should throw an error if an accessed value is not an integer', function test() {
		expect( badValue ).to.throw( TypeError );

		function badValue() {
			var arr = [
				Math.PI,
				1
			];

			lcm( arr, getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lcm( [ 1, 2 ], value );
			};
		}
	});

	it( 'should return null if only provided less than 2 integer arguments', function test() {
		assert.isNull( lcm( 5 ) );
	});

	it( 'should return 0 if provided two integers which are equal to 0', function test() {
		assert.strictEqual( lcm( 0, 0 ), 0 );
		assert.strictEqual( lcm( [0,0]), 0 );
	});

	it( 'should return null if provided a array having fewer than 2 elements', function test() {
		assert.isNull( lcm( [] ) );
		assert.isNull( lcm( [ 1 ] ) );
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

		data = [ 186028, 193052, 144624 ];
		assert.strictEqual( lcm( data ), 324618307124784 );
	});

	it( 'should support an interface for providing two integers', function test() {
		assert.strictEqual( lcm( 6, -4 ), 12 );

		assert.strictEqual( lcm( -6, -4 ), 12 );

		assert.strictEqual( lcm( 2, 8 ), 8 );
	});

	it( 'should provide a variadic interface', function test() {
		assert.strictEqual( lcm( 95, -35, 25 ), 3325 );
	});

	it( 'should compute the lcm using an accessor function', function test() {
		var data;

		data = [
			{'x':0},
			{'x':0}
		];
		assert.strictEqual( lcm( data, getValue ), 0 );

		data = [
			{'x':1},
			{'x':0}
		];
		assert.strictEqual( lcm( data, getValue ), 0 );

		data = [
			{'x':-6},
			{'x':-4}
		];
		assert.strictEqual( lcm( data, getValue ), 12 );

		data = [
			{'x':95},
			{'x':-35},
			{'x':25}
		];
		assert.strictEqual( lcm( data, getValue ), 3325 );

		function getValue( d ) {
			return d.x;
		}
	});

});
