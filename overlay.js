(function( $ ) {

	var overlay_methods = {
		'init' : function(options) {
			return this.each(function(){
				var $me = $(this);
				this.settings = $.extend( {
					'overlayID'         : 'auto',
					'width'				: 'auto',
					'height'			: 'auto',
					'speed'				: null,
					'onFinish'			: $.noop,
					'onCancel'			: $.noop
				}, options);
				this.settings.visible = false;
				if(this.settings.overlayID == 'auto')
				{
					this.settings.overlayID = 'overlay';
				}
				var checkID = this.settings.overlayID;
				var checkLoop = '';
				do
				{
					checkID = checkID + checkLoop;
					checkLoop = checkLoop ? checkLoop + 1 : 2;
				}
				while($('#' + checkID).length > 0);
				var css = {
					'position' : 'fixed',
					'display' : 'none'
				};
				if(this.settings.width != 'auto')
				{
					this.settings.width = parseInt(this.settings.width);
					css['width'] = this.settings.width;
				}
				if(this.settings.height != 'auto')
				{
					this.settings.height = parseInt(this.settings.height);
					css['height'] = this.settings.height;
				}

				this.settings.overlayID = checkID;
				var html = '<div class="overlay-bg-element" id="' + this.settings.overlayID + '_bg" style="display:none;"></div>\
				<div class="overlay" id="' + this.settings.overlayID + '" style="display:none;"><div class="overlay-content"></div></div>';
				$('body').append(html);

				$('#' + this.settings.overlayID).css(css);
				var speed = this.settings.speed;
				overlay_timers[this.settings.overlayID] = null;
				$(this).click(function(){
					$(this).overlay('toggle', speed);
					return false;
				});
			});
		},
		'html' : function(html) {
			return this.each(function(){
				$('#' + this.settings.overlayID + ' .overlay-content').html(html);
			});
		},
		'toggle' : function(speed) {
			return this.each(function(){
				if(this.settings.visible)
				{
					$(this).overlay('hide');

					/*if(speed)
						$('#' + this.settings.overlayID).stop().hide(speed);
					else
						$('#' + this.settings.overlayID).stop().hide();
					this.settings.visible = false;*/
				}
				else
				{
					$(this).overlay('show');
					/*if(speed)
						$('#' + this.settings.overlayID).stop().show(speed);
					else
						$('#' + this.settings.overlayID).stop().show();
					this.settings.visible = true;*/
				}
			});
		},
		'show' : function(speed) {
			this.overlay('_setupFixedPoll');
			return this.each(function(){
				if(speed)
					$('#' + this.settings.overlayID + '_bg, #' + this.settings.overlayID).stop().show(speed);
				else
					$('#' + this.settings.overlayID + '_bg, #' + this.settings.overlayID).stop().show();
				this.settings.visible = true;
			});
		},
		'hide' : function(speed) {
			this.overlay('_unbindFixedPoll');
			return this.each(function(){
				if(speed)
					$('#' + this.settings.overlayID + '_bg, #' + this.settings.overlayID).stop().hide(speed);
				else
					$('#' + this.settings.overlayID + '_bg, #' + this.settings.overlayID).stop().hide();
				this.settings.visible = false;
			});
		},
		'finish' : function() {
			return this.each(function(){
				this.settings.onFinish();
			}).overlay('hide');
		},
		'cancel' : function() {
			return this.each(function(){
				this.settings.onCancel();
			}).overlay('hide');
		},
		'debug' : function() {
			return this.each(function(){
				console.log(this.settings);
			})
		},
		'destroy' : function() {
			this._unbindFixedPoll();
			return this.each(function(){
				$('#' + this.settings.overlayID).remove();
			});
		},
		'_setupFixedPoll' : function(){
			return this.each(function(){
				if(jQuery.support.positionFixed)
				{
					$(this).overlay('_unbindFixedPoll');
					var obj = $(this);
					overlay_timers[this.settings.overlayID] = setInterval(function(){
						var top = $(window).scrollTop();
						$('#' + obj.settings.overlayID + '_bg, #' + obj.settings.overlayID).css('top', top + 'px');
					}, 1000);
				}
			});
		},
		'_unbindFixedPoll' : function(){
			return this.each(function(){
				if(this.settings.overlayID in overlay_timers && overlay_timers[this.settings.overlayID])
				{
					clearInterval(overlay_timers[this.settings.overlayID]);
				}
			});
		}
	};

	var overlay_timers = {};

	$.fn.overlay = function(method) {
		// Method calling logic
		if ( overlay_methods[method] ) {
			return overlay_methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
			return overlay_methods.init.apply( this, arguments );
		}
	};
})( jQuery );


// add positionFixed to jquery.support variable.  i know.  it's sad.  but position:fixed is awesome and it is terrible when you have to work around it.
$(document).ready(function(){
	var container = document.body;

	if (document.createElement && container && container.appendChild && container.removeChild) {
		var el = document.createElement('div');

		if (!el.getBoundingClientRect) return null;

		el.innerHTML = 'x';
		el.style.cssText = 'position:fixed;top:100px;';
		container.appendChild(el);

		var originalHeight = container.style.height,
		originalScrollTop = container.scrollTop;

		container.style.height = '3000px';
		container.scrollTop = 500;

		var elementTop = el.getBoundingClientRect().top;
		container.style.height = originalHeight;

		var isSupported = (elementTop === 100);
		container.removeChild(el);
		container.scrollTop = originalScrollTop;

		jQuery.support['positionFixed'] = isSupported;
	}
	else
	{
		jQuery.support['positionFixed'] = false;
	}

});
