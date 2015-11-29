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
                dest_id = sjson.tasks[c].place_id;
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
    return {
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
}
