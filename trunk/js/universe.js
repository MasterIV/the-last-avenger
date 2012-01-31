function calcNum( x, top, max_rnd, max_fix ) {
	var fix = -.2 * (x-top) * (x-top) + max_fix;
	var rnd = -.15 * (x-top) * (x-top) + max_rnd;

	if( rnd < 0 ) return 0;
	if( fix < 0 ) fix = 0;

	return Math.floor( Math.random() * (rnd-fix) + fix );
}

var universe = {
	sectors: [],
	width: 1900,
	height: 1200,

	create: function( x, y ) {
		if( !this.sectors[x] ) this.sectors[x] = [];
		var arr = this.sectors[x][y] = [];

		// asteroiden erstellen
		astr = Math.floor( Math.random() * 8 + 8 );
		for( var i = 0; i < astr; i++ ) {
			var create_x = x*this.width + Math.floor( Math.random() * this.width );
			var create_y = y*this.height + Math.floor( Math.random() * this.height );
			arr.push( new asteroid( create_x, create_y ));
		}
	},

	scan: function() {
		var x = Math.floor( ship.x / this.width );
		var y = Math.floor( ship.y / this.height );

		var x_var = ( ship.x % this.width + this.width ) % this.width > this.width / 2 ? 1 : -1;
		var y_var = ( ship.y % this.height + this.height ) % this.height > this.height / 2 ? 1 : -1;

		this.check(x, y);
		this.check(x+x_var, y);
		this.check(x, y+y_var);
		this.check(x+x_var, y+y_var);
	},

	check: function( x, y ) {
		var check = this.get( x, y );

		for( var i = check.length-1; i>=0; i-- ) {
			var e = check[i];

			if( ship.dist( e ) < game.min_dist ) {
				e.show();
				check.splice( i, 1 );
			}
		}
	},

	get: function( x, y ) {
		if( !this.sectors[x] || !this.sectors[x][y] ) this.create( x, y );
		return this.sectors[x][y];
	},

	store: function( element ) {
		var x = Math.floor( element.x / this.width );
		var y = Math.floor( element.y / this.height );
		this.get( x, y ).push( element );
	}
}