var ship = {
	direction: 0,
	turn: 0,
	turn_f: .05,

	speed: 0,
	speed_max: 7,
	accelerate: 0,
	accelerate_f: 0.25,

	ammo: 100,
	ammo_max: 100,
	ammo_reg: 10,
	damage: 40,
	
	init: Vector,
	r: 25,

	fire: 0,
	cooldown: 0,
	firerate: 15,

	shield: 100,
	shield_max: 100,
	shield_reg: .05,

	life: 100,
	life_max: 100,

	update: function() {
		this.direction+=this.turn;
		this.direction%=2*Math.PI;

		if( this.speed < this.speed_max && this.accelerate > 0 ) this.speed += this.accelerate;
		else if( this.speed > 1 && this.accelerate < 0 ) this.speed += this.accelerate;

		this.add( rad_to_vector( this.direction, this.speed ));
		
		if( this.cooldown ) {
			this.cooldown--;
		} else if( this.fire && this.ammo ) {
			this.shoot();
		}

		if( this.shield < this.shield_max ) {
			this.shield += this.shield_reg;
			//this.updateShield();
		}
	},
	
	shoot: function() {
			new shot( this );
			ship.cooldown = ship.firerate;
			ship.ammo--;
	},

	harm: function( dmg ) {
		this.shield -= dmg;

		if( this.shield < 0 ) {
			this.life += this.shield;
			this.shield = 0;
			//this.updateLife();
		}

		//this.updateShield();
		//if( this.life < 0 ) game.over();
	}
}

ship.init( 0, 0 );
