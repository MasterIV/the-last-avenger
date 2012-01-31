var inventory = [];

function itemRemove() {
	arrayRemove( collection.items, this );
	map.node.removeChild( this.node );
}

function itemShow() {
	this.objectShow();
	collection.items.push( this );
}

function itemHide() {
	this.remove();
	universe.store( this );
}

function itemSpawn( vector, classe ) {
	this.p = vector.substract( new Vector(12, 12));
	this.node = objectNode( this.p, classe );
  map.node.appendChild( this.node );

  this.r = Math.round(( this.node.offsetWidth + this.node.offsetHeight )/4);
  this.c = this.p.add( new Vector( this.node.offsetWidth / 2, this.node.offsetHeight / 2 ));

	this.remove = itemRemove;
	this.update = objectUpdate;
	this.objectShow = objectShow;
	this.show = itemShow;
	this.hide = itemHide;
}

function itemAdd( img, title ) {
	var node = document.createElement('img');
	node.src = img;
	node.alt = title;
	node.title = title;
	document.getElementById('inventory').appendChild(node);
}

function upgrade( v ) {
	this.spawn = itemSpawn;
	this.spawn( v, "upgrade" );

  this.collect = function() {
		this.remove();
		inventory.push( this );
		itemAdd( 'img/item3.png', 'Upgrade' );
  }
}

function repair( v ) {
	this.spawn = itemSpawn;
	this.spawn( v, "repair" );

  this.collect = function() {
		this.remove();
		inventory.push( this );
		itemAdd( 'img/item5.png', 'Repair' );
  }
}

function technology( v ) {
	this.spawn = itemSpawn;
	this.spawn( v, "technology" );

  this.collect = function() {
		this.remove();
		inventory.push( this );
		itemAdd( 'img/item2.png', 'Technologie' );
  }
}

function ammo( v ) {
	this.spawn = itemSpawn;
	this.spawn( v, "ammo" );

  this.collect = function() {
		this.remove();
    ship.ammo += ship.ammo_reg;
    if (ship.ammo > ship.ammo_max) ship.ammo = ship.ammo_max;
    ship.updateAmmo();
  }
}


function transferItems() {
	document.getElementById('inventory').innerHTML = '';
	var max = inventory.length;
	for( var i = 0; i < max; i++ ) basis[inventory.pop().node.className]++;
	document.getElementById('invwarn').style.display = 'none';
}