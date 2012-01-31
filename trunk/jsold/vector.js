
function Vector( x, y ) {
	this.x = x;
	this.y = y;

	this.add = function( v ) {
		return new Vector( this.x+v.x, this.y+v.y );
	};

	this.substract = function( v ) {
		return new Vector( this.x-v.x, this.y-v.y );
	};

	this.edit = function( v ) {
		this.x += v.x;
		this.y += v.y;
	};

	this.edits = function( v ) {
		this.x -= v.x;
		this.y -= v.y;
	};

	this.invert = function() {
		this.x *= -1;
		this.y *= -1;
	};

	this.angle = function( v ) {
		return rad_to_deg( Math.atan2( v.y-this.y, v.x-this.x )) - 90;
	}

	this.dist = function( v ) {
		return Math.sqrt( Math.pow( v.x-this.x, 2 ) + Math.pow( v.y - this.y, 2));
	}
}

function deg_to_vector( angle, length ) {
	return rad_to_vector( angle * ( Math.PI / 180 ), length );
}

function rad_to_vector( angle, length ) {
		var x = Math.sin( angle ) * length;
		var y = -Math.cos( angle ) * length;
		return new Vector( x, y );
}

function rad_to_deg( rad ) {
		return rad * ( 180 / Math.PI );
}

function arrayRemove( arr, element ) {
	arr.splice( arr.indexOf( element ), 1 );
}