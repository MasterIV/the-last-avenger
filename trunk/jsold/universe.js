var basis = null;

function calcNum( x, top, max_rnd, max_fix ) {
	var fix = -.2 * (x-top) * (x-top) + max_fix;
	var rnd = -.15 * (x-top) * (x-top) + max_rnd;

	if( rnd < 0 ) return 0;
	if( fix < 0 ) fix = 0;

	return Math.floor( Math.random() * (rnd-fix) + fix );
}

var universe = {
	sectors: [],
	width: 1600,
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

		// fighter erstellen
		if( x != 0 || y != 0 ) {
			var abst = (new Vector(0, 0)).dist(new Vector(x, y));

			var num = calcNum( abst, 7, 6, 3 );
			for( var i = 0; i < num; i++ ) {
				var create_x = x*this.width + Math.floor( Math.random() * this.width );
				var create_y = y*this.height + Math.floor( Math.random() * this.height );
				arr.push( new fighter( create_x, create_y ));
			}

			num = calcNum( abst, 10, 6, 3 );
			for( var i = 0; i < num; i++ ) {
				var create_x = x*this.width + Math.floor( Math.random() * this.width );
				var create_y = y*this.height + Math.floor( Math.random() * this.height );
				arr.push( new cruiser( create_x, create_y ));
			}

			if( abst > 10 ) {
				num = Math.floor( Math.random() * (abst-10) * .5 + (abst-10) * .1 );
				for( var i = 0; i < num; i++ ) {
					var create_x = x*this.width + Math.floor( Math.random() * this.width );
					var create_y = y*this.height + Math.floor( Math.random() * this.height );
					arr.push( new battleship( create_x, create_y ));
				}
			}
		}

		// Mainbase erstellen
		if( x == 0 && y == 0 )
			arr.push( basis = new base( center.x-100, center.y-100 ));
	},

	scan: function() {
		var x = Math.floor( zentrum.x / this.width );
		var y = Math.floor( zentrum.y / this.height );

		var x_var =  ( zentrum.x % this.width + this.width ) % this.width > this.width / 2 ? 1 : -1;
		var y_var =  ( zentrum.y % this.height + this.height ) % this.height > this.height / 2 ? 1 : -1;

		this.check(x, y);
		this.check(x+x_var, y);
		this.check(x, y+y_var);
		this.check(x+x_var, y+y_var);
	},

	check: function( x, y ) {
		var check = this.get( x, y );
		var del = [];

		for( var i in check ) {
			var e = check[i];

			if( zentrum.dist( e.pos ) < map.min_dist ) {
				e.show();
				del.push(  e );
			}
		}

		for( var i in del ) {
			arrayRemove( check, del[i] );
		}
	},

	get: function( x, y ) {
		if( !this.sectors[x] || !this.sectors[x][y] ) this.create( x, y );
		return this.sectors[x][y];
	},

	store: function( element ) {
		var pos = element.p.substract( map );
		var x = Math.floor( pos.x / this.width );
		var y = Math.floor( pos.y / this.height );
		var sek = this.get( x, y );

		element.pos = pos;
		sek.push( element );
	}
}