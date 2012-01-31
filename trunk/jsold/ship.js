var ship = {
	direction: 0,
	turn: 0,
	turn_f: 3,

	speed: 0,
	accelerat: 0,
	speed_f: 0.25,


	max_speed: 7,

	fire: 0,
	cooldown: 0,
	firerate: 15,
	weapon: 0,

	radius: 20,

	shield: 100,
	shield_max: 100,
	shield_reg: .2,

	life: 100,
	life_max: 100,


	ammo: 100,
	ammo_max: 100,
	ammo_reg: 10,

	damage: 50,

	max_inventory: 16,

	nova: false,
	novafire: 0,
	novacooldown: 0,

	research: false,
	superweapon: false,

	update: function() {
		this.direction+=this.turn;
		this.direction%=360;

		this.node.style.MozTransform = 'rotate('+this.direction+'deg)';
		this.node.style.WebkitTransform = 'rotate('+this.direction+'deg)';
		this.node.style.OTransform = 'rotate('+this.direction+'deg)';
		
		if( this.speed < this.max_speed && this.accelerat > 0 ) this.speed += this.accelerat;
		else if( this.speed > 1 && this.accelerat < 0 ) this.speed += this.accelerat;
		
		if( this.shield < this.shield_max && cycle % 5 == 0 ) {
			this.shield += this.shield_reg;
			this.updateShield();
		}
	},

	updateShield: function() {
		var shield_percent = this.shield/this.shield_max;
		document.getElementById('shield_bar').style.backgroundPosition = Math.round(shield_percent*200-200)+'px 0px';
		document.getElementById('shield').style.opacity = shield_percent;
		document.getElementById('shield_info').style.opacity = shield_percent;
	},

	updateAmmo: function() {
		var ammo_percent = this.ammo/this.ammo_max;
		document.getElementById('ammo_bar').style.backgroundPosition = Math.round(ammo_percent*200-200)+'px 0px';
	},

	updateLife: function() {
		var life_percent = this.life/this.life_max;
		document.getElementById('life_bar').style.backgroundPosition = Math.round(life_percent*200-200)+'px 0px';
	},

	harm: function( damage ) {
		this.shield -= damage;

		if( this.shield < 0 ) {
			this.life += this.shield;
			this.shield = 0;
			this.updateLife();
		}

		this.updateShield();
		if( this.life < 0 ) loose();
	}
}