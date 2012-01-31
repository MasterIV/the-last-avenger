function explosion( c ) {
	var sound = new Audio( 'sound/explosion.ogg' );
	sound.play();

	this.p = c.substract( new Vector(64, 64));
	this.f = 0;

	this.node = objectNode( this.p, 'explosion' );
	map.node.appendChild( this.node );

	this.updatePos = objectUpdate;

	this.remove = function() {
		collection.ani.splice( collection.ani.indexOf( this ), 1 );
		map.node.removeChild( this.node );
	}
	
	this.hide = this.remove;

	this.update = function( v ) {
		this.node.style.backgroundPosition = (-128*this.f)+"px 0px";
		this.f++;

		if( this.f > 28 ) this.remove();
		else this.updatePos( v );
	}
}

function nova() {
	//var sound = new Audio( 'sound/explosion.ogg' );
	//sound.play();

	this.node = objectCreateNode( 'nova' );
	map.node.appendChild( this.node );
	this.f = 0;

	this.remove = function() {
		collection.ani.splice( collection.ani.indexOf( this ), 1 );
		map.node.removeChild( this.node );
	}

	this.update = function( v ) {
		if( this.f > 15 ) this.remove();
		this.node.style.backgroundPosition = (-500*this.f)+"px 0px";
		this.f++;
	}
}