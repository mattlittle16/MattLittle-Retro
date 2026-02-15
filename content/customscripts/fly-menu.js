;(function ($) {
    $.fn.mclFlyMenu = function (options) {
        this.each(function () {
            $this = $(this);

            //Set left 
            $this.css("left", "-" + $this.outerWidth() + "px");

            //Event listener for Icons Click
            var $Icons = $(".NavIcons");

            $Icons.on("click touchstart", function () {
                if (!$this.hasClass("NavContainerOpen")) {
                    $this.addClass("NavContainerOpen");

                    $Icons.fadeOut(500);

                    //add an invisible div right below flyout menu for event listening
                    var InvisibleDiv = "<div class=\"NavContainerOpenHidden\"></div>";
                    $("body").append(InvisibleDiv);
                    $(".NavContainerOpenHidden").css("z-index", "99999998").css("height", $(window).height() + "px").css("width", $(window).width() + "px").css("position", "fixed").css("top", "0").css("left", "0");
                }
            });

            //Close Menu
            $(document).on("click touchstart", ".NavContainerOpenHidden", function () {
                if ($this.hasClass("NavContainerOpen")) {
                    $(".NavContainerOpenHidden").remove();
                    $this.removeClass("NavContainerOpen");
                    $Icons.fadeIn(500);
                }
            });

            //nav link clicked
            $this.find("a").on("click touchstart", function () {
                $Icons.fadeIn(500);
                $this.removeClass("NavContainerOpen");
                $(".NavContainerOpenHidden").remove();
            });

            //window resized 
            $(window).resize(function() {
                $this.css("left", "-" + $this.outerWidth() + "px");
            });
        });
        return this;
    };
})(jQuery);