;(function ($) {
    $.fn.mclImageRotate = function (options) {

        var defaults = {
            speed: 800,
            pause: 5000
        },
          settings = $.extend({}, defaults, options),
          ImagesArray,
          i = 0,
          ListCount = 0,
          pause = false,
          Image1Height = 0,
          ImageHeightSet = false;


        this.each(function () {
            var $this = $(this);
            
            $(window).load(function () { //weird image loading stuffs
                //Get Images into JQuery Objects
                ImagesArray = $this.find("img");

                ListCount = ImagesArray.length;

                var SwapImage = (function () {
                    setTimeout(function () {
                        if (!pause) {
                            if (!ImageHeightSet) {
                                GetImage1Height();
                            }
                            i++;
                            if (i != 0) { $(ImagesArray[i]).css("height", Image1Height + "px"); } //don't set image 1 height, leave that one controlled by CSS
                            i--;

                            $(ImagesArray[i]).fadeOut(settings.speed, function () {
                                i++;
                                if (i >= ListCount) { i = 0; }
                                $(ImagesArray[i]).fadeIn(settings.speed);
                            });
                        }
                        SwapImage();
                    }, settings.pause);
                });

                function GetImage1Height() {
                    Image1Height = $(ImagesArray[0]).outerHeight();
                    ImageHeightSet = true;
                }

                function HideMCLImages() {
                    for (var i2 = 1; i2 < ImagesArray.length; i2 ++)
                    {
                        $(ImagesArray[i2]).css("display", "none");
                    }
                    $(ImagesArray[0]).css("display", "block");
                }

                $this.mouseover(function () {
                    pause = true;
                });

                $this.mouseout(function () {
                    pause = false;
                });

                $(window).resize(function () {
                    pause = true;
                    HideMCLImages();
                    ImageHeightSet = false;
                    i = 0;
                    waitForFinalEvent(function () { pause = false; }, 1000, makeid());
                });

                function makeid() {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var i = 0; i < 5; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    return text;
                }

                var waitForFinalEvent = (function () {
                    var timers = {};
                    return function (callback, ms, uniqueId) {
                        if (timers[uniqueId]) {
                            clearTimeout(timers[uniqueId]);
                        }
                        timers[uniqueId] = setTimeout(callback, ms);
                    };
                })();

                SwapImage();
            });
        });
        // returns the jQuery object to allow for chainability.
        return this;
    }
})(jQuery);

