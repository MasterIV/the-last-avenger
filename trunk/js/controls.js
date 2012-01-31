function key_down(evt) {
    evt = (evt) ? evt : ((event) ? event : null);

		if( evt ) {
			if( evt.keyCode == 116 ) return true;
			if( evt.keyCode == 38 ) ship.accelerate = ship.accelerate_f;
			if( evt.keyCode == 40 ) ship.accelerate = -ship.accelerate_f;
			if( evt.keyCode == 37 ) ship.turn = -ship.turn_f;
			if( evt.keyCode == 39 ) ship.turn = ship.turn_f;

			if( evt.keyCode == 32 ) ship.fire = 1;
			if( evt.keyCode == 86 ) ship.novafire = 1;

			if( evt.keyCode == 80 ) togglepause();
			if( evt.keyCode == 83 ) togglemenu();
			if( evt.keyCode == 68 ) toggledock();

			if( evt.keyCode == 78 ) {
				var start = zentrum.add( deg_to_vector( ship.direction + Math.round(Math.random() * 30 - 15), 500 ));

				document.getElementById('bgmusic').pause();
				document.getElementById('catmusic').play();

				var nyancat = new nyan( start.x, start.y );
				nyancat.show();
			}

			return false;
		}
	}

  function key_up(evt) {
    evt = (evt) ? evt : ((event) ? event : null);

		if( evt ) {
			if( evt.keyCode == 116 ) return true;
			if( evt.keyCode == 38 && ship.accelerate > 0 ) ship.accelerate = 0;
			if( evt.keyCode == 40 && ship.accelerate < 0 ) ship.accelerate = 0;
			if( evt.keyCode == 37 && ship.turn < 0 ) ship.turn = 0;
			if( evt.keyCode == 39 && ship.turn > 0 ) ship.turn = 0;

			if( evt.keyCode == 32 ) ship.fire = 0;
			if( evt.keyCode == 86 ) ship.novafire = 0;

			return false;
		}
  }