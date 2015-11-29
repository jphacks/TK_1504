$(function(){
    console.log("initialized");
    var s_data = sampledata;

    var vueMain = new Vue({
        el:'.top-wrapper',
        data:{
            started:false
        }
    });
    var vueResult = new Vue({
        el:'.result-wrapper',
        data:{
            result:[]
        }
    });

    $('.btn-start').click(function(){
        if(!vueMain.started){
            vueResult.result = s_data;

            setTimeout(function(){
        	    $(".top-wrapper").toggleClass('anime-active');

                $('tbody .t-row')
                    .css({opacity: 0})
                    .each(function(i){
                        $(this).delay(250 * i)
                            .animate({opacity: 1}, 700);
                    });
            },600);
        }
        vueMain.started = true;
    });
});

var sampledata = {
    "tasks":[
        {
            "task_id":0,
            "name":"蒙古タンメン中本 渋谷店",
            "time":60,
            "place_id":"ChIJxT2CKqiMGGARWqOQf5dVQ14",
            "type":"place"
        },
        {
            "task_id":1,
            "name":"",
            "time":10,
            "place_id":null,
            "type":"move"
        },
        {
            "task_id":2,
            "name":"駒形どぜう 渋谷店",
            "time":70,
            "place_id":"ChIJRUBoyFeLGGARyIyrBLdP2RI",
            "type":"place"
        },
        {
            "task_id":4,
            "name":"",
            "time":12,
            "place_id":null,
            "type":"move"
        },
        {
            "task_id":5,
            "name":"天下一品 渋谷店",
            "time":40,
            "place_id":"ChIJO1kJpqmMGGARue-xGYR8Oh0",
            "type":"restaurant"
        },
        {
            "task_id":6,
            "name":"",
            "time":15,
            "place_id":null,
            "type":"move"
        },
        {
            "task_id":7,
            "name":"ラーメン凪 豚王 渋谷店",
            "time":80,
            "place_id":"ChIJPxXKJFyLGGARzeKOI4NWutw",
            "type":"place"
        },
        {
            "task_id":8,
            "name":"",
            "time":12,
            "place_id":null,
            "type":"move"
        },
        {
            "task_id":9,
            "name":"食幹 渋谷店 (Shokkan shibuya)",
            "time":60,
            "place_id":"ChIJwX8rr16LGGARKmcPdU_bTwA",
            "type":"place"
        }
    ]
};
