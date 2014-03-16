$(document).ready(function(){
$(".hidden").hide();
$(".show").html("--------------------------------------------------------------------------------------<div class=less>MORE</div>");
$(".show").click(function() {
if (this.className.indexOf('clicked') != -1 ) {
		$(this).prev().slideUp(500);
		$(this).removeClass('clicked')
		$(this).html("--------------------------------------------------------------------------------------<div class=less>MORE</div>");
		}
		else {
		$(this).addClass('clicked')
		$(this).prev().slideDown(500);
		$(this).html("--------------------------------------------------------------------------------------<div class=less>LESS</div>");
		}
});
});
