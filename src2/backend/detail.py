import json

def json_make(json):
    result = {}
    list=["id","name","formatted_address",\
    "formatted_phone_number",\
    "user_ratings_total","reviews","place_id"]
    #result["opentime"] = json["opening_hours"]
    for i in range(len(list)):
        if list[i] in json:
            result[list[i]]=json[list[i]]
    result["location"]=json["geometry"]["location"]
    return result
    
def main(str):
    p=(json.loads(str.encode("utf-8")))
    if p["status"]!="OK":
        return None
    return json_make(p["result"])
