/**
 * This is a jQuery plug-in to slide pics.
 * 
*/
(function(){
    jQuery.fn.easyCarusel = function(options) {
        options = jQuery.extend({
            shownTime: 5000,
            duration: 1500,
            easing: 'easeOutExpo',
            hasIndicator: false,
            indi: jQuery('#indi'),
            on: 'on'
        }, options);
        var _this = this;
        var EASY_CAROUSEL = {
            timer: null,
            current: 0,
            targetWidth: 0,
            addEasing: function(){
                jQuery.extend(jQuery.easing,{
                    def: 'easeOutExpo',
                    easeOutExpo: function (x, t, b, c, d) { return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b; }
                });
            },
            makeClone: function(){
                var _imgs = _this.children();
                var _length = _imgs.length - 1;
                if(_imgs.length <= 1) return;
                _imgs.eq(0).clone(true).appendTo(_this);
                _this.css('width', EASY_CAROUSEL.targetWidth * (_imgs.length + 1));
                EASY_CAROUSEL.timersetup();
                if(options.hasIndicator) {
                    EASY_CAROUSEL.addClickEvent(_imgs);
                }
            },
            addClickEvent: function(imgs){
                var _length = imgs.length - 1;
                var _indi = options.indi.children();
                _indi.each(function(i){
                    jQuery(this).click(function(){
                        clearTimeout(EASY_CAROUSEL.timer);
                        if(i >= imgs.length) i = i - 1;
                        _indi.eq(i).addClass(options.on);
                        for(var _i = 0; _i <= _length; _i++) {
                            if(i != _i) {
                                if(_indi.eq(_i).hasClass(options.on)) {
                                    _indi.eq(_i).removeClass(options.on);
                                }
                            }
                        }
                        _this.stop()
                            .animate({
                                left: -EASY_CAROUSEL.targetWidth * i
                            }, {
                                duration: options.duration,
                                easing: options.easing,
                                complete: function(){
                                    EASY_CAROUSEL.timersetup();
                                }
                            });
                        EASY_CAROUSEL.current = i;
                    });
                });
            },
            timersetup: function(){
                EASY_CAROUSEL.timer = setTimeout(EASY_CAROUSEL.execute, options.shownTime);
            },
            execute: function(){
                EASY_CAROUSEL.current++;
                var _length = _this.children().length - 1;
                _this.stop().animate({
                    left: -EASY_CAROUSEL.targetWidth * EASY_CAROUSEL.current
                }, {
                    duration: options.duration,
                    easing: options.easing,
                    complete: function(){
                        var _c = parseInt(jQuery(this).css('left').replace('px')) / -EASY_CAROUSEL.targetWidth;
                        if(_c == _length) _this.css('left', '0px');
                        EASY_CAROUSEL.timersetup();
                    }
                });
                if(EASY_CAROUSEL.current == _length) EASY_CAROUSEL.current = 0;
                if(options.hasIndicator) {
                    var _indi = options.indi.children();
                    _indi.eq(EASY_CAROUSEL.current).addClass(options.on);
                    for(var _i = 0; _i < _length; _i++) {
                        if(EASY_CAROUSEL.current != _i) {
                            if(_indi.eq(_i).hasClass(options.on)) {
                                _indi.eq(_i).removeClass(options.on);
                            }
                        }
                    }
                }
            },
            initialize: function(){
                EASY_CAROUSEL.targetWidth = _this.parent().width();
                EASY_CAROUSEL.addEasing();
                EASY_CAROUSEL.makeClone();
            }
        };
        EASY_CAROUSEL.initialize();
    };
})(jQuery);