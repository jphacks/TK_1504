import requests as req
import argparse
import datetime
import json

from flask import Flask,request

import googleapi 
import googledetail
import capsule
import detail

app=Flask(__name__)
from math import *

def move_time(now,next):
    url="https://maps.googleapis.com/maps/api/distancematrix/json"
    param={"origins":str(now[0])+","+str(now[1]),\
    "destinations":str(next[0])+","+str(next[1]),\
    "key":"AIzaSyCT_1vO2SmSjSFKTpsPJTvR1flLjSOpC-w",\
    "mode":"walking"}
    r=req.get(url,param)
    r=json.loads(r.text.encode("utf-8"))
    return r["rows"][0]["elements"][0]["duration"]["value"]


def api(point,key):
    t=googleapi.main\
    (point[0],point[1],key)
    t=capsule.main(t)
    t=googledetail.main(t)
    t=detail.main(t)
    return t
    
def isMeal(date,meal_time,spend_time):    
    if (meal_time.seconds<date.seconds and \
    date.seconds<meal_time.seconds+spend_time.seconds and \
    meal_time.seconds<date.seconds and \
    date.seconds<meal_time.seconds+spend_time.seconds):
        return True
    return False
    

def key_choice(date,lunch_time,dinner_time,spend_time,meal):
    if (not meal[0])and(isMeal(date,lunch_time,spend_time)):
        meal[0]=True
        return True
    elif (not meal[1]) and (isMeal(date,dinner_time,spend_time)):
        meal[1]=True
        return True
    elif (not meal[0]) and \
    (date.seconds>(lunch_time+datetime.timedelta(hours=2)).seconds):
        meal[0]=True
        return True
    elif (not meal[1]) and \
    (date.seconds>(dinner_time+datetime.timedelta(hours=2)).seconds):
        meal[1]=True
        return True
    else :
        return False
        
        
def server(point,date,spend_time):
    now=datetime.datetime.now()
    point=point if point!=None else ["35.658182","139.702043"]
    point[0]=point[0] if point[0]!=None else "35.658182"
    point[1]=point[1] if point[1]!=None else "139.702043"
    spend_time=spend_time if spend_time!=None else datetime.timedelta(hours=2)
    date=date if date!=None else\
    datetime.timedelta(days=now.day+1,seconds=now.second,\
    minutes=now.minute,hours=10)
    time=datetime.datetime.now()
    food_key="restaurant"
    amuse_key=["amusement_park","aquarium"]
    lunch_time=datetime.\
    timedelta\
    (hours=11,minutes=30)
    dinner_time=datetime.\
    timedelta\
    (hours=18,minutes=30)
    result_list={"tasks":[]}
    id_list=[]
    now={"location":{"lat":point[0],"lng":point[1]}}
    next=""
    meal=[False,False]
    key=key_choice(date,lunch_time,dinner_time,spend_time,meal)
    if date.seconds>(lunch_time+datetime.timedelta(hours=2)).seconds:
        meal[0]=True
    counter=0
    #print "tet"
    while(True):
        if key:
            next=api(point,food_key)
        else:
            next=api(point,amuse_key)
        if next["id"] in id_list:
            continue
        id_list.append(next["id"])
        """
        move_time=None//
        add
        """
        ti=move_time(point,[next["location"]["lat"],next["location"]["lng"]])/60
        task={"task_id":counter,"name":"",\
        "time":ti,"place_id":"",\
        "type":"move"}
        result_list["tasks"].append(task)
        counter+=1
        
        task={"task_id":counter,"name":next["name"],\
        "time":120,"place_id":next["place_id"],\
        "type":"restaurant" if key else "place"}
        counter+=1
        result_list["tasks"].append(task)
        date=datetime.timedelta(seconds=date.seconds+spend_time.seconds)
        point=[next["location"]["lat"],next["location"]["lng"]]
        now=next
        if meal[1] and date.seconds>dinner_time.seconds:
            break
        key=key_choice(date,lunch_time,dinner_time,spend_time,meal)
        # date.seconds
        
    return json.dumps(result_list)
    
    
    
@app.route("/",methods=["GET"])
def test():
    lat=request.args.get("lat")
    lng=request.args.get("lng")
    date=request.args.get("date")
    if date!=None:
        date=datetime.timedelta(seconds=date)
    spend_time=request.args.get("spend_time")
    if spend_time!=None:
        spend_time=spend_timetime.timedelta(seconds=spend_time)
    
    return server([lat,lng],date,spend_time)

if __name__=="__main__":
    app.run(host="localhost")
    #server(None,None,None)
    
    
