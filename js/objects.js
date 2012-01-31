function shot( parent, sprite, radius, direction ) {
	s.play( 'sound/laser.ogg' );

	this.inherit = Vector;
	this.inherit( parent.x, parent.y );
	this.add( rad_to_vector( parent.direction, 20 ));

	this.g = sprite ? sprite : g.shot;
	this.r = radius ? radius : 4;

	this.move = rad_to_vector( parent.direction, 10+parent.speed_max );
	this.direction = direction ? direction : parent.direction;

	game.shots.push(this);
	game.objects.push(this);

	this.update = function( dist ) {
		this.add( this.move );
		game.draw( this.g, this.x, this.y, this.direction );
	};

	this.hide =	this.remove = function() {
		game.shots.remove( this );
		game.objects.remove( this );
	};
}

function asteroid( x, y ) {
	this.inherit = Vector;
	this.inherit( x, y );

	this.g = [ g.asteroid1, g.asteroid2, g.asteroid3, g.asteroid4 ][Math.floor(Math.random()*4)];
	this.r = Math.round(( this.g.width+this.g.height )/4 );

	this.direction = 0;
	this.damage = 40;
	this.life = 50;

	this.update = function( dist ) {
		if( dist < ship.r+this.r ) {
			this.destroy();
			ship.harm(this.damage);
			return;
		}

		for( var i = game.shots.length-1; i >= 0; i-- ) {
			var s = game.shots[i];
			if( this.dist( s ) < this.r+s.r ) {
				s.remove();
				this.harm( ship.damage );
			}
		} 

		game.draw( this.g, this.x, this.y );
	};


	this.destroy = function() {
		new explosion( this );
		this.remove();
	};

	this.show = function() {
		game.objects.push( this );
	};

	this.harm = function( dmg ) {
		this.life -= dmg;
		if( this.life < 0 ) this.destroy();
		else s.play( 'sound/hit.ogg' );
	};

	this.hide = function() {
		universe.store( this );
		this.remove();
	};

	this.remove = function() {
		game.objects.remove( this );
	};
}