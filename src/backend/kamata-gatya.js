module.exports=function(str){
	
	function gatya(map){
		var ave=average(map);
		var stand=standard_deviation(map);
		
		var ran=Math.random();
		
		var tmp=1.0/Math.sqrt(2*Math.PI*stand);
		var stand2=Math.pow(stand,2);
		var counter=0;
		var i;
		for(i in map){
			var fx=0;
			if (map[i].rating==undefined){
				fx=tmp*Math.exp(-Math.pow(3.0-ave,2)/(2*stand2));
			}else{
				fx=tmp*Math.exp(-Math.pow(map[i].rating-ave,2)/(2*stand2));
			}
			counter+=fx;
			if(counter>ran){
				return i;	
			}
		}
		return i;
	};
	
	
	function average(data){
		var sum=0;
		var len=0;
		for(var i in data){
			if(data[i].rating!=undefined){
				sum+=data[i].rating;				
			}
			len++;
		}
		
		return sum/len;
	};
	function variance(data){
		var ave=average(data);
		var varia=0;
		var len=0;
		for(var i in data){
			if(data[i].rating==undefined){
				varia+=Math.pow(3.0-ave,2);
			}
			else{
				varia+=Math.pow(data[i].rating-ave,2);
			}
			len++;
		}
		return varia/len;
	};
	standard_deviation:function (data){
    var varia = variance(data);
    return Math.sqrt(varia);
	};
	function map_set(){
		var dict={};
		var result=json.results;
		for(var i=0;i<result.length;i++){
			dict[result[i].id]=result[i];
		}
		return dict;
	};
	
	json=str;
	json=JSON.parse(JSON.parse(json));
	
	return gatya(map_set());
	
	
	

}
