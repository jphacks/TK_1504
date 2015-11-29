var mapObj = null;
var lng = 139.702043;
var lat = 35.658182;
var dest_id = null;
var sjson = getSampleData();

var json_length = Object.keys(sjson.tasks).length;
json_length = json_length - 1;
console.log(json_length);

var nodes = 0;
for (var i = 0; i < json_length; i++){
    if(sjson.tasks[i].type != "move"){
        nodes++;
    }
}
console.log("nodes:"+nodes);
var wayPoints = new Array(nodes);


var c = 0;
for (var i = 0; i < json_length; i++){
    if(sjson.tasks[i].type != "move"){
        wayPoints[c] =  {"location": {"placeId" : null}};
        console.log(wayPoints[c].location);
        c++;
    }
}

google.maps.event.addDomListener(window, 'load', function()
{
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true
    };
    mapObj = new google.maps.Map(document.getElementById('gmap'), mapOptions);

    var c = 0;
    for (var i=0; i <= json_length; i++){
        if(sjson.tasks[i].type != "move"){
            if(c == nodes){
                dest_id = sjson.tasks[i].place_id;
                console.log("dest_id"+dest_id)
            }else{
                wayPoints[c].location.placeId = sjson.tasks[i].place_id;
                console.log(wayPoints[c].location.placeId);
            }
            c++;
        }

    }

    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(mapObj);

    var request = {
        origin: {lat, lng},
        destination: {'placeId': dest_id},
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        waypoints: wayPoints
    };

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(result, status)
    {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    });

});
function getSampleData(){
    return {"tasks":[
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
}
