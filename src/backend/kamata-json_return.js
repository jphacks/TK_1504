var details={
  
  main:function(str){
    var p=JSON.parse(str);
    if(p["status"]!="OK"){
      return undefined;
    }
    return this.json_make(p.result);
  },
  json_make:function(json){
    var result={};
    result["shop_id"]=json.id;
    result["location"]=json.geometry.location;
    result["shop_name"]=json.name;
    result["address"]=json.formatted_address;
    result["phone_number"]=json.formatted_phone_number;
    result["review_ave"]=json.user_ratings_total;
    result["opentime"]=json.opening_hours;
    result["reviews"]=json.reviews;
    
    return JSON.stringify(result);
  },
  
}
