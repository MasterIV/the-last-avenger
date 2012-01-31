function objectCreateNode( classe ) {
	var node =  document.createElement('div');
	node.className = classe;
	return node;
}

function objectPositionNode( node, vector ) {
	node.style.top  = vector.y + 'px';
	node.style.left = vector.x + 'px';
}

function objectNode( vector, classe ) {
	var node = objectCreateNode( classe );
	objectPositionNode( node, vector );
	return node;
}

function objectUpdate( v ) {
	if( center.dist( this.p ) > map.max_dist  ) {
		this.hide();
	} else {
		this.p.edits( v );
		if( this.c ) this.c.edits( v );

		this.node.style.top  = this.p.y + 'px';
		this.node.style.left = this.p.x + 'px';
	}
}

function objectUpdateMove( v ) {
	var sum = this.v.substract( v );
	sum.invert();
	this.updatePos( sum );
}

function removeEnemy() {
	arrayRemove( collection.enemys, this );
	map.node.removeChild( this.node );
}

function enemyHarm( damage ) {
	this.life -= damage;
	if( this.life < 0 ) {
		this.destroy();
		return true;
	} else {
		sound = new Audio ( 'sound/hit.ogg' );
		sound.play();
		return false;
	}
}

function objectShow() {
		this.p = this.pos.add( map );
 		objectPositionNode( this.node, this.p );
		map.node.appendChild( this.node );
		this.c = this.p.add( new Vector( this.node.offsetWidth / 2, this.node.offsetHeight / 2 ));
		this.r = Math.round(( this.node.offsetWidth + this.node.offsetHeight )/4);
}

var asteroids = [ 'asteroid_1' , 'asteroid_2', 'asteroid_4', 'asteroid_5'  ];

function asteroid( x, y ) {
	this.damage = 40;
	this.life = 50;
	this.pos = new Vector(x, y);

	this.node = objectCreateNode( asteroids[Math.floor(Math.random()*asteroids.length)] );

	this.harm = enemyHarm;
	this.remove = removeEnemy;
	this.update = objectUpdate;
	this.objectShow = objectShow;

	this.show = function() {
		this.objectShow();
		collection.enemys.push( this );
	}

	this.hide = function() {
		this.remove();
		universe.store( this );
	}

	this.destroy =  function() {
		this.remove();
		collection.ani.push( new explosion( this.c ));

		var chance = Math.random();
		if( chance < .3 )	collection.items.push( new ammo( this.c ));
		else if( chance < .4 )	collection.items.push( new repair( this.c ));
		else if( chance < .6 )	collection.items.push( new upgrade( this.c ));
	}
}

function base( x, y ) {
	this.pos = new Vector(x, y);
	this.node = objectCreateNode( 'base' );
	this.arrow = false;
	this.arrNode = document.getElementById( 'base_indicator' );

	this.technology = 0;
	this.upgrade = 0;
	this.repair = 0;

	this.remove = function() {
		arrayRemove( collection.allys, this );
		map.node.removeChild( this.node );
	}

	this.update = objectUpdate;
	this.objectShow = objectShow;

	this.show = function() {
		this.objectShow();
		collection.allys.push( this );

		this.arrow = false;
		this.arrNode.style.display = 'none';
	}

	this.updateArrow = function() {
		var angle = this.pos.angle( zentrum );
		this.arrNode.style.MozTransform = 'rotate('+angle+'deg)';
		this.arrNode.style.WebkitTransform =  'rotate('+angle+'deg)';
		this.arrNode.style.OTransform = 'rotate('+angle+'deg)';
	}

	this.hide = function() {
		this.remove();
		universe.store( this );

		this.arrow = true;
		this.updateArrow();
		this.arrNode.style.display = 'block';
	}
}

function initFighter( x, y, d, l, s, classe ) {
	this.rnd = Math.round( Math.random()*360 );

	this.damage = d;
	this.life = l;
	this.speed = s;

	this.pos = new Vector(x, y);
	this.node = objectCreateNode( classe );

	this.harm = enemyHarm;
	this.remove = removeEnemy;
	this.updateMove = objectUpdateMove;
	this.updatePos = objectUpdate;
	this.objectShow = objectShow;

	this.update = function(v) {
		if( cycle % 3 == 0 ) {
			var dir = ( this.p.angle( center )+180+this.rnd ) % 360;
			var vgl = ( this.direction+this.rnd ) % 360;

			if( dir < vgl ) this.direction -= 4;
			else if( dir > vgl ) this.direction += 4;

			this.v = deg_to_vector( this.direction, this.speed );
			this.node.style.MozTransform = 'rotate('+this.direction+'deg)';
			this.node.style.WebkitTransform = 'rotate('+this.direction+'deg)';
			this.node.style.OTransform = 'rotate('+this.direction+'deg)';
		}

		if( cycle % 53 == 0 ) {
			this.rnd = Math.round( Math.random()*360 );
		}

		this.updateMove(v);
	}

	this.show = function() {
		this.objectShow();

		this.direction = this.p.angle( center )+180;
		this.v = deg_to_vector( this.direction, this.speed );
		this.node.style.MozTransform = 'rotate('+this.direction+'deg)';
		this.node.style.WebkitTransform =  'rotate('+this.direction+'deg)';
		this.node.style.OTransform =  'rotate('+this.direction+'deg)';

		collection.enemys.push( this );
	}

	this.hide = function() {
		this.remove();
		universe.store( this );
	}
}

function fighter( x, y ) {
	this.init = initFighter;
	this.init(x, y, 40, 40, 5, 'fighter1' );

	this.destroy =  function() {
		this.remove();
		collection.ani.push( new explosion( this.c ));

		var chance = Math.random();
		if( chance < .2 )	collection.items.push( new ammo( this.c ));
		else if( chance < .3 )	collection.items.push( new repair( this.c ));
		else if( chance < .8 )	collection.items.push( new upgrade( this.c ));
		else if( chance < .9 )	collection.items.push( new technology( this.c ));
	}
}

function cruiser( x, y ) {
	this.init = initFighter;
	this.init(x, y, 60, 100, 6, 'fighter2' );

	this.destroy =  function() {
		this.remove();
		collection.ani.push( new explosion( this.c ));

		var chance = Math.random();
		if( chance < .1 )	collection.items.push( new ammo( this.c ));
		else if( chance < .2 )	collection.items.push( new repair( this.c ));
		else if( chance < .8 )	collection.items.push( new upgrade( this.c ));
		else collection.items.push( new technology( this.c ));
	}
}

function battleship( x, y ) {
	this.init = initFighter;
	this.init(x, y, 100, 200, 5, 'fighter3' );

	this.destroy =  function() {
		this.remove();
		collection.ani.push( new explosion( this.c ));

		var chance = Math.random();
		if( chance < .1 )	collection.items.push( new ammo( this.c ));
		else if( chance < .2 )	collection.items.push( new repair( this.c ));
		else if( chance < .4 )	collection.items.push( new upgrade( this.c ));
		else 	collection.items.push( new technology( this.c ));
	}
}

function nyan( x, y ) {
	this.init = initFighter;
	this.init(x, y, 500, 1000, 6, 'cat' );

	this.destroy =  function() {
		this.remove();
		collection.ani.push( new explosion( this.c ));
		collection.items.push( new technology( this.c ));
		collection.items.push( new technology( this.c ));
		collection.items.push( new technology( this.c ));

		document.getElementById('bgmusic').play();
		document.getElementById('catmusic').pause();
	}
}