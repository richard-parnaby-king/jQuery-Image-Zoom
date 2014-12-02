/*!
 * jQuery Image Zoom v1
 * http://richard.parnaby-king.co.uk
 * https://github.com/richard-parnaby-king/jQuery-Image-Zoom
 *
 * Copyright 2014 Richard Parnaby-King
 */
(function($){
	"use strict";
	//global options
	var opts = {
		scaleAmount:1.2, //(float) amount to zoom in / out by
		zoomInText:'+', //(string) Text to show in span for zoom in button
		zoomOutText:'-'  //(string) Text to show in span for zoom out button
	};
	$.fn.imageZoom = function(options){
		opts = $.extend(opts,options);
		this.each(function() {
			//local variables
			var $this = $(this),
				link = $this.find('a'),
				bigImage = link.attr('href'),
				image = $this.find('img'),
				currentScale = 1,
				mouseDown = false,
				sWidth,sHeight,ix,iy;
				
			link.on('click.imageZoom', function(e){e.preventDefault();});
			$this.addClass('imageZoom-holder');
			
			image.on('load',function(){
				sWidth = image.width();
				sHeight = image.height();
				image.attr('src',bigImage);
				image.width(sWidth);
				image.height(sHeight);
			});
			
			//add buttons to image
			$this.append('<div class="imageZoom-buttons"><span class="zoomInButton" unselectable="on">'+opts.zoomInText+'</span><span class="zoomOutButton" unselectable="on">'+opts.zoomOutText+'</span></div>');
			var buttons = $this.find('.imageZoom-buttons');
			
			//when click on zoom in/out buttons, scale image accordingly
			buttons.find('.zoomInButton').on('click.imageZoom',function(){
				currentScale *= opts.scaleAmount;
				image.css({
					'-webkit-transform' : 'scale(' + currentScale + ')',
					'-moz-transform'    : 'scale(' + currentScale + ')',
					'-ms-transform'     : 'scale(' + currentScale + ')',
					'-o-transform'      : 'scale(' + currentScale + ')',
					'transform'         : 'scale(' + currentScale + ')'
				});
			});
			buttons.find('.zoomOutButton').on('click.imageZoom',function(){
				//make image smaller, but do not allow image to be made smaller than original size
				if(currentScale > 1) {
					currentScale /= opts.scaleAmount;
					image.css({
						'-webkit-transform' : 'scale(' + currentScale + ')',
						'-moz-transform'    : 'scale(' + currentScale + ')',
						'-ms-transform'     : 'scale(' + currentScale + ')',
						'-o-transform'      : 'scale(' + currentScale + ')',
						'transform'         : 'scale(' + currentScale + ')'
					});
				} else {
					//if image is original size, position image back into centre
					image.css({'left':0,'top':0});
				}
			});
			
			//when click/drag on image, move image
			image.on('mousedown touchstart',function(e){
				ix = e.pageY,
				iy = e.pageX;
				if(e.originalEvent instanceof TouchEvent) {
					ix = e.originalEvent.touches[0].pageX;
					iy = e.originalEvent.touches[0].pageY;
				}
				mouseDown = true;
				return false;
			});
			image.on('mouseup touchend touchcancel',function(e){
				mouseDown = false;
			});
			image.on('mousemove touchmove',function(e){
				if(e.originalEvent instanceof TouchEvent) {
					e.pageX = e.originalEvent.touches[0].pageX;
					e.pageY = e.originalEvent.touches[0].pageY;
				}
				if(mouseDown == true && ((iy - e.pageX) < 50 && (iy - e.pageX) > -50)) {
					var offsetLeft = parseInt(	image.css('left').replace(/[^0-9\.\-]+/,'')	|0	) - (	iy - e.pageX	),
						offsetTop = parseInt(	image.css('top').replace(/[^0-9\.\-]+/,'')	|0	) - (	ix - e.pageY	);
				
					//move image
					image.css(	'left',	offsetLeft	);
					image.css(	'top',	offsetTop	);
				}
				iy = e.pageX;
				ix = e.pageY;
			});
		});
	};
})(jQuery);
