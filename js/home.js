
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
    changeBorderStyleNav();
})
