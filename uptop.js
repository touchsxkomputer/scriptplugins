$(function(){
   $(window).scroll(function () {
     if($(window).scrollTop() >= 300)
     {
     $('#goTopBtn').slideDown(200);
     }else
     {
     $('#goTopBtn').slideUp(200);
     }
   });      
   $('#goTopBtn').click(function(){
    $('body,html').animate({scrollTop:0},500)
   });   
   var win_width= $(window).width(); 
   var content_width= $('.index-content').width();   
   var topbtn_width= $('#goTopBtn').width(); 
   var topbtn_posi = ([win_width - content_width ]/2 - topbtn_width - 10);
   $('#goTopBtn').css({'right':topbtn_posi});
   
 })
