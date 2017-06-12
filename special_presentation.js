(function($){
	"use strict";

	$(document).ready(function() {
		SpecialSpinner.init();
	});

	function SpinLayer(id, color) {
		this.deg = 0;
		this.scale = 1;
		this.id = id;
		this.color = color;
	}

	window.SpecialSpinner = {
		word: $('#special'),
		layers: [],
		spin_delay: 30,
		spin_speed: 10,
		zoom_speed: 10,
		scale_mag: .05,

		init: function() {

			var spin_layers = [
				'white',
				'orange',
				'orange',
				'orange',
				'white',
				'white',
				'white',
				'purple',
				'purple',
				'purple',
				'blue',
				'blue',
				'blue'
			];

			for (var i=1; i<=spin_layers.length; i++) {
				this.layers.push(new SpinLayer(i,spin_layers[i]));
			}

			this.createLayers();

			var wait = this.spin_delay;
			$.each(this.layers, $.proxy(function(k,obj) {
				setTimeout($.proxy(function() { this.spinIt(obj); },this), wait);
				wait += this.spin_delay;
			},this));
		},

		createLayers: function() {
			$.each(this.layers, $.proxy(function(i,obj) {
				this.add_layer(obj);
			},this));
		},

		spinIt: function(obj) {
			this['spin_'+obj.id] = setInterval($.proxy(function() {
				this.transform_spin(obj);
			},this), this.spin_speed);
		},

		zoomOut: function() {
			$.each(this.layers, $.proxy(function(k,obj) {
				clearInterval(this['spin_'+obj.id]);
			},this));
			$('.other_specials').remove();

			$(this.word).addClass('big_special').removeClass('not_special');
			var zoom_scale = 20;
			this['zoom'] = setInterval($.proxy(function() {
				zoom_scale -= .5;
				this.transform_zoom(zoom_scale);
			},this), this.zoom_speed);
		},

		present: function() {
			clearInterval(this['zoom']);
			$(this.word).addClass('is_special').removeClass('big_special').attr('style','');
			$('.other_words').css('visibility','visible');
		},

		transform_spin: function(obj) {
			obj.deg += 1;
			obj.scale += this.scale_mag;

			$('#'+obj.id).css({
				"-webkit-transform": "rotate(-"+obj.deg+"deg) scale("+obj.scale+")",
				"-moz-transform": "rotate(-"+obj.deg+"deg) scale("+obj.scale+")",
				"-o-transform": "rotate(-"+obj.deg+"deg) scale("+obj.scale+")",
				"transform": "rotate(-"+obj.deg+"deg) scale("+obj.scale+")"
			});
			if (obj.deg == 180) this.zoomOut();
		},

		transform_zoom: function(scale) {
			$(this.word).css({
				"-webkit-transform": "scale("+scale+")",
				"-moz-transform": "scale("+scale+")",
				"-o-transform": "scale("+scale+")",
				"transform": "scale("+scale+")"
			});
			if (scale == 1) this.present();
		},

		add_layer: function(obj) {
			var layer = $('<div/>', {
				class: 'other_specials '+obj.color,
				text: $(this.word).html(),
				id: obj.id
			});

			$(this.word).after(layer);
			return obj;
		}

	}

})(jQuery);