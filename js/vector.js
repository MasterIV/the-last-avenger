function Vector( x, y ) {
	this.x = x;
	this.y = y;

	this.sum = function( v ) {
		return new Vector( this.x+v.x, this.y+v.y );
	};

	this.diff = function( v ) {
		return new Vector( this.x-v.x, this.y-v.y );
	};

	this.add = function( v ) {
		this.x += v.x;
		this.y += v.y;
	};

	this.substract = function( v ) {
		this.x -= v.x;
		this.y -= v.y;
	};

	this.invert = function() {
		this.x *= -1;
		this.y *= -1;
	};

	this.rad = function( v ) {
		return Math.atan2( v.y-this.y, v.x-this.x ) - Math.PI/2;
	};

	this.deg = function( v ) {
		return rad_to_deg( this.rad( v ));
	};

	this.dist = function( v ) {
		return Math.sqrt( Math.pow( v.x-this.x, 2 ) + Math.pow( v.y - this.y, 2));
	};
}

function deg_to_vector( angle, length ) {
	return rad_to_vector( angle * ( Math.PI / 180 ), length );
}

function rad_to_vector( angle, length ) {
		var x = Math.round( Math.sin( angle ) * length );
		var y = -Math.round( Math.cos( angle ) * length );
		return new Vector( x, y );
}

function rad_to_deg( rad ) {
		return rad * ( 180 / Math.PI );
}

Array.prototype.remove = function( element ) {
	this.splice( this.indexOf( element ), 1 );
}