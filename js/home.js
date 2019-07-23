
/***********************************/
/*
** animation for navBar
*/
/***********************************/
function changeBorderStyleNav() {
    let nav = $(".navbar");
    let style = ["1px solid #004C8C" , "1px dashed #004C8C" , "1px dotted #004C8C"];
    let i=0;
    setInterval(function () {
        nav.css("borderBottom",style[i%3]);
        i++
    },1000)
}




$(function () {
    $(".text-about-me h2").addClass("animation-text"); // text animation in the header will starts only if the dom is ready
    changeBorderStyleNav();



})

$(document).ready(function(e) {
//var windowBottom = $(window).height();
    var index=0;
    $(document).scroll(function(){
        var top = $('.technical').height()-$(window).scrollTop();
        console.log(top)
        if(top <= (-2100)){
            if(index==0){

                $('.chart').easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function(from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    }
                });

            }
            index++;
        }
    })
});
