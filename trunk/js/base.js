var base = {
	init: Vector,
	hidden: false,
	
	update: function( dist ) {
		// check if ship is in rang
		game.draw( g.base, this.x, this.y );
	},

	hide: function() {
		this.hidden = true;
		game.objects.remove( this );
		universe.store( this );
	},

	show: function() {
		this.hidden = false;
		game.objects.push( this );
	},

	arrow: function() {
		if( this.hidden ) game.draw( g.arrow, ship.x, ship.y, this.rad( ship ));
	}
};

base.init( 0, 0 );
game.objects.push( base );
