var s = {
	sampels: [],

	play: function( file ) {
		if( !this.sampels[file]  )
			this.sampels[file] = [];

		if( this.sampels[file].length ) {
			this.sampels[file].pop().play();
		} else {
			var sound = new Audio( file );
			sound.onended = function() { s.sampels[file].push( this ); };
			sound.play();
		}
	}
}