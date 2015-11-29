$(function(){
    var s_data = sampledata2;

    var vueMain = new Vue({
        el:'.top-wrapper',
        data:{
            started:false
        }
    });
    var vueResult = new Vue({
        el:'.result-wrapper',
        data:{
            result:[],
            time_sum:[0]
        }
    });

    $('.btn-start').click(function(){
        if(!vueMain.started){
            vueMain.started = true;
            $.ajax({
                type: 'GET',
                url: 'http://urlurlurlurlurlurl',
                dataType:'json'
            }).done(function(data){
                console.log('ajax done');
                console.log(data);

                var ts = 0;
                for(var i = 0; i< data.tasks.length;i++){
                    ts += data.tasks[i].time;
                    vueResult.time_sum.push(ts);
                }
                // setTimeout(function(){
            	//     $(".top-wrapper").toggleClass('anime-active');
                // },500);
            }).fail(function(){
                console.log('ajax fail');
            }).always(function(){
                console.log('ajax finish');
            });

            // (Debug start)
            var ts = 0;
            for(var i = 0; i< s_data.tasks.length;i++){
                ts += s_data.tasks[i].time;
                vueResult.time_sum.push(ts);
            }
            vueResult.result = s_data;
            setTimeout(function(){
        	    $(".top-wrapper").toggleClass('anime-active');
            },4500);
            // (Debug end)
        }
        vueMain.started = true;
    });
});
var sampledata2 = {"tasks":[
    {
        "task_id":0,
        "name":"渋谷駅",
        "time":0,
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
        "name":"渋谷マルイ",
        "time":60,
        "place_id":"ChIJX_NZC6iMGGARDI6s1py_YFE",
        "type":"place"
    },
    {
        "task_id":3,
        "name":"",
        "time":10,
        "place_id":null,
        "type":"move"
    },
    {
        "task_id":4,
        "name":"大戸屋ごはん処 渋谷文化村通り店",
        "time":70,
        "place_id":"ChIJl5fum6mMGGARRuwGQzkjpZ4",
        "type":"restaurant"
    },
    {
        "task_id":5,
        "name":"",
        "time":12,
        "place_id":null,
        "type":"move"
    },
    {
        "task_id":6,
        "name":"渋谷パルコ",
        "time":40,
        "place_id":"ChIJ44Pj4qiMGGAR3GEtALkWC6A",
        "type":"place"
    },
    {
        "task_id":7,
        "name":"",
        "time":15,
        "place_id":null,
        "type":"move"
    },
    {
        "task_id":8,
        "name":"パーティーランド 渋谷スペイン坂店",
        "time":80,
        "place_id":"ChIJK81DAKmMGGARfQ88Gs52-qk",
        "type":"place"
    },
    {
        "task_id":9,
        "name":"",
        "time":13,
        "place_id":"ChIJK81DAKmMGGARfQ88Gs52-qk",
        "type":"move"
    },
    {
        "task_id":11,
        "name":"ヒューマントラストシネマ渋谷",
        "time":120,
        "place_id":"ChIJozhgx6eMGGARodrqXyuZy88",
        "type":"place"
    },
    {
        "task_id":9,
        "name":"",
        "time":13,
        "place_id":"ChIJK81DAKmMGGARfQ88Gs52-qk",
        "type":"move"
    },
    {
        "task_id":12,
        "name":"道頓堀くくる 東急百貨店東横店",
        "time":60,
        "place_id":"ChIJJWy_GFiLGGARrFNyWrzsK_I",
        "type":"restaurant"
    }
]
};
