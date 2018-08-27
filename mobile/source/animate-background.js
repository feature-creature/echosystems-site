

var animateBackground = function(){


var frontlayer = $('.frontlayer');
var bglayer = $('.bglayer');
var overlay = $('.overlay, .overlay h1');


// Move front layer a bit more than the bg layer.
frontlayer.animate({
    textIndent: 0
}, {
    step: function(now, fx) {
        overlay.mousemove(function(e) {
            var amountMovedX = (e.pageX * 1 / 20);
            var amountMovedY = (e.pageY * 1 / 20);
            frontlayer.css({
                '-webkit-transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
                '-moz-transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
                '-ms-transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
                '-o-transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
                'transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)'
            });
        });
    },
    duration: 1000
}, 'easeOutCubic');


//bg animate layer a bit slower also seen on amountMovedX.

bglayer.animate({
    textIndent: 0
}, {
    step: function(now, fx) {
        overlay.mousemove(function(e) {
            var amountMovedX = (e.pageX * 1 / 6);
            var amountMovedY = (e.pageY * 1 / 6);
            bglayer.css({
                '-webkit-transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
                '-moz-transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
                '-ms-transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
                '-o-transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
                'transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)'
            });
        });
    },
    duration: 5000
}, 'easeOutCubic');
    
/*Adding in animation functions for CCD Images*/

var ccdBg = $('.ccd-bg2');
var factor= 1.1;


    $('.ccd-title').mouseenter(function(){
        ccdBg.animate({
            width: ccdBg.width()*factor,
            height: ccdBg.height()*factor
        }, 400);
    });
    
    $('.ccd-title').mouseleave(function(){
        ccdBg.animate({
            width: ccdBg.width()/factor,
            height: ccdBg.height()/factor
        }, 600);
    });
  
    
};