import requests as req
import json



def main(lat,lng,type):
    if type.__class__==list:
        tmp=""
        for i in range(len(type)):
            tmp+="&types="+type[i]
        type=tmp
    totalData={}
    keyid = "AIzaSyCT_1vO2SmSjSFKTpsPJTvR1flLjSOpC-w"
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?&radius=1500&language=ja&sensor=false"+type
    param={"location":str(lat)+","+str(lng),"key":keyid}
    for i in range(3):
        r=req.get(url,param)
        totalData.update(json.loads(r.text.encode("utf-8")))
        
        #totalData.append(r.text)
    return totalData
    
if __name__=="__main__":
    lat = "35.658182"
    lng = "139.702043"
    start(lat,lng)
