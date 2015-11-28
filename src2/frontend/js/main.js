$(function(){
    console.log("initialized");
    $('.btn-start').click(function(){
        console.log("click");
    	$(".top-wrapper").toggleClass('anime-active');
    });
});
