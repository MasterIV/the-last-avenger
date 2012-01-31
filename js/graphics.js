
var g = {
	afterload: null,

	urls: [
		['ship', 'img/avenger_only.png'],
		['shield', 'img/avenger_shield.png'],
		['bg', 'img/bg_jan.png'],
		['shot', 'img/schuss.png'],
		['phasor','img/phasor.png'],
		['asteroid1','img/asteroid1.png'],
		['asteroid2','img/asteroid2.png'],
		['asteroid3','img/asteroid4.png'],
		['asteroid4','img/asteroid5.png'],
		['base','img/base.png'],
		['arrow','img/arrow.png'],
		['explosion','img/explosion.png']
	],

	load: function( after ) {
		if( typeof after == 'function' ) {
			g.afterload = after;
			g.load();
		} else if( g.urls.length ) {
			var loading = g.urls.pop();
			g[loading[0]] = new Image();
			g[loading[0]].onload = g.load;
			g[loading[0]].src = loading[1];
		} else {
			g.afterload();
		}
	}
};