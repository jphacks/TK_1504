var Tools={
	json:"",
	
	init:function(){
		
	},
	main:function(str){
		this.set(str);
		this.parse();
		//debug
		this.parse();
		//
		var map=this.map_set();
		console.log(map);
		
		return this.gatya(map);
	},
	gatya:function(map){
		var ave=this.average(map);
		var stand=this.standard_deviation(map);
		
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
	},
	
	standard_deviation:function (data){
    var varia = this.variance(data);
    return Math.sqrt(varia);
	},
	average:function(data){
		var sum=0;
		var len=0;
		for(var i in data){
			if(data[i].rating!=undefined){
				sum+=data[i].rating;				
			}
			len++;
		}
		
		return sum/len;
	},
	variance:function(data){
		var ave=this.average(data);
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
	},
	
	set:function(json){
		this.json=json;
	},

	parse:function(){
		this.json=JSON.parse(this.json);
	},
	
	map_set:function(){
		var dict={};
		var result=this.json.results;
		for(var i=0;i<result.length;i++){
			dict[result[i].id]=result[i];
		}
		return dict;
	},
	
	choice:function(){
		
	},

}
