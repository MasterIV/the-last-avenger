var game = {
	w: 0,
	h: 0,

	max_dist: 0,
	min_dist: 0,

	frames: 0,
	fps: 40,

	screen: null,
	s: null,

	buffer: null,
	b: null,

	objects: [],
	shots: [],

	loop: function() {
		var start = new Date().getTime();
		
		game.frames++;
		game.bg();
		
		game.b.save();
		game.b.translate( -ship.x+game.w/2, -ship.y+game.h/2 );
		
		ship.update();
		game.draw( g.shield, ship.x, ship.y, ship.direction );
		game.draw( g.ship, ship.x, ship.y, ship.direction );

		for( var i = game.objects.length-1; i >= 0; i-- ) {
			var o = game.objects[i];
			var dist = ship.dist( o );
			
			if( dist > game.max_dist ) o.hide();
			else o.update( dist );
		}

		base.arrow();
		game.b.restore();
		
		game.debug();
		game.s.drawImage( game.buffer, 0 ,0 );

		universe.scan();

		var refresh = 25 + start - new Date().getTime();
		if( refresh < 1 ) setTimeout( game.loop, 1 );
		else setTimeout( game.loop, refresh );
	},

	debug: function() {
		game.b.fillStyle="#FFFFFF";
		game.b.fillText('FPS: '+game.fps, 5, game.h - 10, 200 );

		game.b.fillText('Shield: '+(ship.shield>>0), 5, 10, 200 );
		game.b.fillText('Life: '+(ship.life>>0), 5, 20, 200 );
		game.b.fillText('Ammo: '+ship.ammo, 5, 30, 200 );
	},
	
	bg: function() {
		game.b.save();
		game.b.translate( Math.floor(-ship.x+game.w/2)%g.bg.width, Math.floor(-ship.y+game.h/2)%g.bg.height );
		
		for( var x = -1; x < 1 + game.w / g.bg.width; x++ )
			for( var y = -1; y < 1 +game.h / g.bg.height; y++ )
				game.b.drawImage( g.bg, g.bg.width*x, g.bg.height*y );
		
		game.b.restore();
	},

	draw: function( img, x, y, angle, alpha ) {
		game.b.save();
		game.b.translate( x>>0, y>>0 );

		if( angle ) game.b.rotate( angle );
		if( alpha ) game.b.globalAlpha = alpha;

		game.b.drawImage( img, -img.width/2>>0, -img.height/2>>0 );

// Debug to display Hitboxes
// game.b.strokeStyle = "#FFFFFF";
// game.b.beginPath();
// game.b.arc( 0,0,(img.width+img.height)/4>>0,0,Math.PI*2,true);
// game.b.stroke();

		game.b.restore();
	},

	drawSprite: function( img, x, y, w, f ) {
		game.b.save();
		game.b.translate( x>>0, y>>0 );
		game.b.drawImage( img, w*f, 0, w, img.height, -w/2>>0, -img.height/2>>0, w, img.height );
		game.b.restore();
	}
}
