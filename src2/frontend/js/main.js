$(function(){
    console.log("initialized");

    var vueMain = new Vue({
        el:'.top-wrapper',
        data:{
            started:false
        }
    });
    $('.btn-start').click(function(){
        if(!vueMain.started){
            setTimeout(function(){
        	    $(".top-wrapper").toggleClass('anime-active');
            },2000);
        }
        vueMain.started = true;
    });
});
