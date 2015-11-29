import json
import math
import random
def gatya(map):

    ave = average(map)
    stand = standard_deviation(map)
    
    stand=stand if stand!=0 else 1

    ran = random.random()

    tmp = 1.0/math.sqrt(2*math.pi*stand)
    stand2 = math.pow(stand, 2)
    counter = 0
    i=0
    for i in map:
        fx = 0

        if "rating" not in map[i]:
            fx = tmp * math.exp(-math.pow(3.0-ave,2)/(2*stand2))
        else:
            fx = tmp * math.exp(-math.pow(map[i]["rating"]-ave,2)/(2*stand2))
        counter += fx;

        if counter > ran:
            return i
    return i

def average(data):
    sum = 0
    len = 0
    for i in data:
        if "rating" in data[i]:
            sum += data[i]["rating"]
        len+=1
    len=len if len!=0 else 1
    return sum/len

def variance(data):
    ave = average(data)
    varia = 0
    len = 0
    for i in data:
        if("rating" not in data[i]):
            varia += math.pow(3.0-ave,2)
        else:
            varia += math.pow(data[i]["rating"]-ave,2)
        len+=1
    len=len if len!=0 else 1
    return varia/len

def standard_deviation(data):
    varia = variance(data)
    return math.sqrt(varia)

def map_set(j):
    dict = {}
    result = j["results"]
    for i in range(len(result)):
        dict[result[i]["place_id"]] = result[i]
    return dict

def main(st):
    #ctx.eval("j=JSON.parse(str);")
    #print j
    return gatya(map_set(st))
    

if __name__=="__main__":
    main("")
