$(document).ready(function () {
    if ($("#OldAssIE").length > 0) {
        //old ass IE
        $("#PageContainer").addClass("hidden");
        console.log("lolol get a better browser, scrub");
    }

    var WaveInit = false;

    var FullPage = $('#fullpage').fullpage({
        verticalCentered: true,
        scrollingSpeed: 700,
        resize: false,
        easing: 'easeInQuart',
        scrollOverflow: true,
        css3: true,
        keyboardScrolling: true,
        touchSensitivity: 15,
        anchors: ["Welcome","Me","Experience"],
        afterLoad: function (anchorLink, index) {
            if (anchorLink == "Contact" && WaveInit == false) {
                var wave = new Wave();
                wave.Initialize('world');
                WaveInit = true;
            }
        },
        animateAnchor: false,
        menu: "#MainMenu"
    });


    var onImgLoad = function (selector, callback) {
        $(selector).each(function () {
            if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
                callback.apply(this);
            }
            else {
                $(this).on('load', function () {
                    callback.apply(this);
                });
            }
        });
    };

    onImgLoad($('img'), function () {
        if (!$(this).hasClass("nope") && !$(this).hasClass("NoAutoLoadMe")) {
            $(this).hide().fadeIn(700);
        }
    });

    //email validation 
    var validation = new mclValidation("ConnectForm");

    //send email 
    $(document).on("submit", "#ConnectForm", function (e) {
        e.preventDefault();
        console.log("Sending Message");
        var data = $("#ConnectForm").serialize();

        console.log(data);

        if (validation.submitErrors()) {
            $.ajax({
                type: "GET",
                url: "/Send.aspx",
                data: data
            }).done(function (data) {
                $("#ConnectForm .FormInput").each(function (i, obj) {
                    $(obj).val("");
                    $(".MsgSuccess").fadeIn(1000);
                });
            });
        }
    });

    $(window).load(function () {
        setTimeout(function ()
        {
            $("#LoadingDiv").addClass("nope");
            $("#PageContainer").css("display", "none");
            $("#PageContainer").removeClass("PageContainerLoad");
            $("#PageContainer").fadeIn(2000);
            $(".NavIcons").fadeIn(2000);
            //$(".PlayPause").fadeIn(2000);
            $(FullPage).fullpage.scrollToAnchor();
        }
        , 800);
    })


    $(".MclSlider1").mclImageRotate();
    $(".MclSlider2").mclImageRotate();
    $(".NavContainer").mclFlyMenu();

    //snow.count = 30;   // number of flakes
    //snow.delay = 20;   // timer interval
    //snow.minSpeed = 2; // minimum movement/time slice
    //snow.maxSpeed = 5; // maximum movement/time slice
    //snow.start();

    
    //$(document).on("click", ".Pause", function () {
    //    $el = $(this);
    //    $el.fadeOut(600, function () {
    //        $el.removeClass("Pause").addClass("Play");
    //        $el.fadeIn(600);
    //    });
    //    window.play = false;
    //    player.stopVideo();
    //});

    //$(document).on("click", ".Play", function () {
    //    $el = $(this);
    //    $el.fadeOut(600, function () {
    //        $el.removeClass("Play").addClass("Pause");
    //        $el.fadeIn(600);
    //    });
    //    window.play = true;
    //    player.playVideo();
    //});
});

// Load the YouTube API asynchronously
//var tag = document.createElement('script');
//tag.src = "https://www.youtube.com/iframe_api";
//var firstScriptTag = document.getElementsByTagName('script')[0];
//firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//window.play = true;

//var player;
//window.onYouTubeIframeAPIReady = function () {
//    player = new YT.Player('player', {
//        height: '0',
//        width: '0',
//        videoId: 'eLAaOmUJVW0',
//        events: {
//            'onReady': onPlayerReady,
//            'onStateChange': onPlayerStateChange,
//        }
//    });
//};

//function onPlayerReady(event) {
//    console.log("hi");
//    event.target.setVolume(10);
//    event.target.playVideo();
//}

//function onPlayerStateChange(event) {
//    if (window.play == true) {
//        event.target.playVideo();
//    }
//}