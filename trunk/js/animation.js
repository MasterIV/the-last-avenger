function Animation( parent ) {
	this.inherit = Vector;
	this.inherit( parent.x, parent.y );
	
	this.f = 0;
	this.w = this.g.height;
	this.c = this.g.width/this.g.height;

	game.objects.push( this );

	this.update = function( dist ) {
		if( this.f < this.c ) game.drawSprite( this.g, this.x, this.y, this.w, this.f++ );
		else this.remove();
	};

	this.hide =	this.remove = function() {
		game.objects.remove( this );
	};
}

function explosion( parent ) {
	s.play( 'sound/explosion.ogg' );
	this.g = g.explosion;

	this.inherit = Animation;
	this.inherit( parent );
}
