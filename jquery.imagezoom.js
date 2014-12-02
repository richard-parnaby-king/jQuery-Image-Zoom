/*!
 * jQuery Image Zoom v1
 * http://richard.parnaby-king.co.uk
 * https://github.com/richard-parnaby-king/jQuery-Image-Zoom
 *
 * Copyright 2014 Richard Parnaby-King
 */
 ;( function ( $, window, document, undefined ) {

    var pluginName = 'imageZoom',
        options = {
			scaleAmount:1.2, //(float) amount to zoom in / out by
			zoomInText:'+', //(string) Text to show in span for zoom in button
			zoomOutText:'-'  //(string) Text to show in span for zoom out button
        };

    function ImageZoom( element, opts ) {
        this.element = element;
        this._name = pluginName;
        options = $.extend( {}, options, opts );


		//local variables
		var link = this.element.find('a'),
			bigImage = link.attr('href'),
			image = this.element.find('img'),
			currentScale = 1,
			mouseDown = false,
			ix = 0,
			iy = 0,
			sWidth,sHeight;
				
		this.image = image;
		this.link = link;
		link.on('click.' + pluginName, function(e){e.preventDefault();});
		this.element.addClass('imageZoom-holder');
			
		image.on('load',function(){
			image.css({
				'-webkit-transform' : 'scale(1)',
				'-moz-transform'    : 'scale(1)',
				'-ms-transform'     : 'scale(1)',
				'-o-transform'      : 'scale(1)',
				'transform'         : 'scale(1)',
				'top'				: '0',
				'left'				: '0'
			});
			sWidth = image.width();
			sHeight = image.height();
			image.attr('src',bigImage);
			image.width(sWidth);
			image.height(sHeight);
		});
			
		//add buttons to image
		this.element.append('<div class="imageZoom-buttons"><span class="zoomInButton" unselectable="on">'+options.zoomInText+'</span><span class="zoomOutButton" unselectable="on">'+options.zoomOutText+'</span></div>');
		var buttons = this.element.find('.imageZoom-buttons');
			
		//when click on zoom in/out buttons, scale image accordingly
		buttons.find('.zoomInButton').on('click.' + pluginName,function(){
			currentScale *= options.scaleAmount;
			image.css({
				'-webkit-transform' : 'scale(' + currentScale + ')',
				'-moz-transform'    : 'scale(' + currentScale + ')',
				'-ms-transform'     : 'scale(' + currentScale + ')',
				'-o-transform'      : 'scale(' + currentScale + ')',
				'transform'         : 'scale(' + currentScale + ')'
			});
		});
		buttons.find('.zoomOutButton').on('click.' + pluginName,function(){
			//make image smaller, but do not allow image to be made smaller than original size
			if(currentScale > 1) {
				currentScale /= options.scaleAmount;
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
			
		this.buttons = buttons;
			
		//when click/drag on image, move image
		image.on('mousedown.' + pluginName + ' touchstart.' + pluginName,function(e){
			ix = e.pageY,
			iy = e.pageX;
			if(e.originalEvent instanceof TouchEvent) {
				ix = e.originalEvent.touches[0].pageX;
				iy = e.originalEvent.touches[0].pageY;
			}
			mouseDown = true;
			return false;
		});
		image.on('mouseup.' + pluginName + ' touchend.' + pluginName + ' touchcancel.' + pluginName,function(e){
			mouseDown = false;
		});
		image.on('mousemove.' + pluginName + ' touchmove.' + pluginName,function(e){
			if(e.originalEvent instanceof TouchEvent) {
				e.pageX = e.originalEvent.touches[0].pageX;
				e.pageY = e.originalEvent.touches[0].pageY;
			}
			if(mouseDown == true) {
				var offsetLeft = parseInt(	image.css('left').replace(/[^0-9\.\-]+/,'')	|0	) - (	iy - e.pageX	),
					offsetTop = parseInt(	image.css('top').replace(/[^0-9\.\-]+/,'')	|0	) - (	ix - e.pageY	);
				
				//move image
				image.css(	'left',	offsetLeft	);
				image.css(	'top',	offsetTop	);
				iy = e.pageX;
				ix = e.pageY;
			}
		});
    };

    ImageZoom.prototype.destroy = function(){
		this.image.off('.' + pluginName);
		this.buttons.off('.' + pluginName);
		this.element.find('.imageZoom-buttons').remove();
		this.element.removeData();
    };

    $.fn[pluginName] = function( options ){
		return this.each( function() {
			if( !$.data( this, pluginName )) {
				$.data( this, pluginName, new ImageZoom ( $(this), options ));
			}
		});
    }

} )( jQuery, window, document );
