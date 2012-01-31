var upgrades = [
	{
		name: 'Phasor',
		description: 'Fortschrittliche Strahlenwaffe: Verursacht 70 Schadenspunkte',
		cost: 5,
		damage: 70,
		weapon: 1,
		lab: false
	},{
		name: 'Schildkondensator',
		description: 'Schnelleres Wiederaufladen der Schilde',
		cost: 9,
		shield_reg: .4,
		lab: true
	},{
		name: 'Multiphasenschid',
		description: 'Verdoppelt die maximale Kapazität des Schildes',
		cost: 9,
		shield_max: 200,
		lab: false
	},{
		name: 'Subraum Kompression',
		description: 'Verdoppelt die Kapazität des Frachtraums',
		cost: 7,
		max_inventory: 32,
		lab: false
//	},{
//		name: 'Frachtraumvergrößerung',
//		description: 'Erhöht fir Kapazität des Frachtraums auf 64',
//		cost: 25,
//		max_inventory: 64,
//		lab: true
	},{
		name: 'Plasmakanone',
		description: 'Glühende Plasmageschosse, die 100 Schaden verursachen',
		cost: 16,
		damage: 100,
		weapon: 3,
		lab: true
	},{
		name: 'Disruptor',
		description: 'Verschießt drei Geschosse gleichzeitig, bei einem Schaden von 60',
		cost: 18,
		damage: 60,
		weapon: 2,
		lab: true
	},{
		name: 'Trägheitsdämpfung',
		description: 'Reduziert die Trägheit und verbessert somit die Lenkung',
		cost: 8,
		turn_f: 5,
		lab: true
	},{
		name: 'Fusionsantrieb',
		description: 'Erhöht die maximale Geschwindigkeit um 3',
		cost: 3,
		max_speed: 10,
		lab: false
	},{
		name: 'Schwere Panzerung',
		description: 'Verdoppelt die maximale Gesundheit',
		cost: 11,
		life_max: 200,
		lab: true
	},{
		name: 'Schnellschussrampen',
		description: 'Erhöht die Feuergeschwindigkeit',
		cost: 12,
		firerate: 10,
		lab: false
	},{
		name: 'Projektilreplikator',
		description: 'Doppelter Ertrag beim Einsammeln von Munition',
		cost: 9,
		ammo_reg: 20,
		lab: false
	},{
		name: 'Gefechtskapseln',
		description: 'Verdoppelt Munitionskapazität',
		cost: 6,
		ammo_max: 200,
		lab: false
	},{
		name: 'Forschungslabor',
		description: 'Ermöglicht neue Technologien',
		cost: 14,
		research: true,
		lab: false,
		complete: function() { basis.node.style.backgroundImage = 'url(img/base1.png)'; }
	},{
		name: 'Waffenbänke',
		description: 'Ermöglicht den Bau der Superwaffe',
		cost: 21,
		superweapon: true,
		lab: true,
		complete: function() { basis.node.style.backgroundImage = 'url(img/base2.png)'; }
	},{
		name: 'Quantendetonator',
		description: 'Spezialwaffe für Flächenangriffe',
		cost: 17,
		nova: true,
		lab: true
	}
];

function showtechlist() {
	var techlist = '<div class="o_repair active" onclick="repair_ship();"><span>5</span><h4>Reparieren</h4><p>Repariert 20 Schadenspunkte</p></div>';
	var node = document.getElementById('baseotions');
	
	for( var i in upgrades ) {
		var up = upgrades[i];
		var stat = up.done ? 'done' : ( ship.research || !up.lab ? 'active' : 'inactive' );
		var desc = ship.research || !up.lab ? up.description : 'Benötigt Forschungslabor';
		techlist += '<div class="o_upgrade '+stat+'" onclick="research( '+i+' )"><span>'+up.cost+'</span><h4>'+up.name+'</h4><p>'+desc+'</p></div>';
	}

	var stat = ship.superweapon ? 'active' : 'inactive' ;
	var desc = ship.superweapon ? 'Vernichtet die Kashiik' : 'Benötigt Waffenbänke';
	techlist += '<div class="o_technology '+stat+'" onclick="win();"><span>50</span><h4>Superwaffe</h4><p>'+desc+'</p></div>';

	node.innerHTML = techlist;

	if( basis ) {
		document.getElementById('technology').innerHTML = basis.technology;
		document.getElementById('upgrade').innerHTML = basis.upgrade;
		document.getElementById('repair').innerHTML = basis.repair;
	}
}

function research( tech ) {
	var up = upgrades[tech];

	if( !up.done ) {
		if( !basis || basis.upgrade < up.cost ) return;
		if( up.lab && !ship.research ) return;

		basis.upgrade -= up.cost;
		if( up.complete ) up.complete();
		up.done = true;
	}

	for( var i in up )
		if( typeof ship[i] != 'undefined' )
			ship[i] = up[i];

	showtechlist();
}