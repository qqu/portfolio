/* 
   Description: Animates the header upon scroll

*/

$(function(){
    var header = $(".front header"),
    yOffset = 0,
    triggerPoint = 150;
    $(window).scroll(function(){
        yOffset = $(window).scrollTop();
        //header scroll effect  
        if(yOffset >= triggerPoint){
            header.addClass("site-header-min");
        }else{
            header.removeClass("site-header-min");    
        }

        //front page skills fadein
        if(yOffset >= 200){
            $('.skills-left').removeClass('invisible').addClass('animated flipInX');
            $('.skills-right').removeClass('invisible').addClass('animated flipInX');
        }

        /*
           $('section[data-type="background"]').each(function() {
           var $bgObj = $(this);
           var distance = $bgObj.offset().top - yOffset;
           var yPos = (yOffset / $bgObj.data('speed')) ;
           var bgP = '50% ' + (distance - yPos) + 'px';

           $bgObj.css("background-position", bgP);    
           });
           */
    });

    $("body:not('.front')").find("header").addClass("site-header-min").removeClass("site-header");


    $('.resume-view-btn').hover(function() {
        $(this).addClass("animated jello");
    }, function() {
        $(this).removeClass("animated jello");
    });

    $(window).stellar({
        responsive: true,
        horizontalScrolling: false,
        horizontalOffset: 0,
        verticalOffset: 0
    });
    
    scrollNav();
    typingSlider();
});

function scrollNav() {
    $('.site-nav a').click(function(){  
        //Toggle Class
        $(".active").removeClass("active");      
        $(this).closest('a').addClass("active");
        var theClass = $(this).attr("class");
        $('.'+theClass).parent('a').addClass('active');
        //Animate
        var anchor =  $(this).prop("hash");
        $('html, body').stop().animate({
            scrollTop: $(anchor).offset().top
        }, 200);
        return false;
    });
    $('.scrollTop a').scrollTop();
}

function typingSlider() {
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;

    };

    TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);

        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);

        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 100;

        if (this.isDeleting) { delta /= 2;  }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;

        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;

        }

        setTimeout(function() {
            that.tick();

        }, delta);

    };

    window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);

            }

        }
        // INJECT CSS
        //   var css = document.createElement("style");
        //     css.type = "text/css";
        //       css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666  }";
        //         document.body.appendChild(css);
        //
    };
}
//end of doc loading

