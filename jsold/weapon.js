function shot( classe, r, angle ) {
	var self = this;

	var sound = new Audio( 'sound/laser.ogg' );
	sound.play();

	if( typeof angle == 'undefined' ) angle = 0;
	var w = Math.floor( r / 2 );

	this.p = deg_to_vector( ship.direction, 30 );
	this.p.edit( new Vector( center.x-1-w, center.y-8 ));
	this.v = deg_to_vector( ship.direction+angle, 10+ship.max_speed );
	this.r = r;

	this.node = objectNode( this.p, classe );
	this.node.style.MozTransform = 'rotate('+ship.direction+'deg)';
	this.node.style.WebkitTransform = 'rotate('+ship.direction+'deg)';
	this.node.style.OTransform = 'rotate('+ship.direction+'deg)';
	map.node.appendChild( this.node );

	this.c = this.p.add( new Vector( w, w ));

	this.remove = function() {
		arrayRemove( collection.shots, this );
		map.node.removeChild( this.node );
	}

	this.hide = this.remove;
	this.update = objectUpdateMove;
	this.updatePos = objectUpdate;
}

var weapons = [
	function() {
			collection.shots.push( new shot( 'shot_normal', 5 ));
	},

	function() {
			collection.shots.push( new shot( 'shot_phasor', 5 ));
	},

	function() {
			collection.shots.push( new shot( 'shot_disruptor', 5 ));
			collection.shots.push( new shot( 'shot_disruptor', 5, +5));
			collection.shots.push( new shot( 'shot_disruptor', 5, -5));
	},

	function() {
			collection.shots.push( new shot( 'shot_plasma', 8 ));
	}
];
