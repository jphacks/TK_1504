import json

def gatya(map):

    ave = average(map)
    stand = standard_deviation(map)

    ran = random.random()

    tmp = 1.0/math.sqrt(2*math.pi*stand)
    stand2 = math.pow(stand, 2)
    counter = 0

    for i in map:
        fx = 0

        if map[i].rating == undefined:
            fx = tmp * math.exp(-math.pow(3.0-ave,2)/(2*stand2))
        else:
            fx = tmp * math.exp(-math.pow(map[i].rating-ave,2)/(2*stand2))
        counter += fx;

        if counter > ran:
            return i
    return i

def average(data):
    sum = 0
    len = 0
    for i in data:
        if data[i].rating != undefined:
            sum += data[i].rating
        len++

    return sum/len

def variance(data):
    ave = average(data)
    varia = 0
    len = 0
    for i in data:
        if(data[i].rating == undefined):
            varia += math.pow(3.0-ave,2)
        else:
            varia += math.pow(data[i].rating-ave,2)
        len++
    return varia/len

def standard_deviation(data):
    varia = variance(data)
    return math.sqrt(varia)

def map_set():
    dict = {}
    result = json.results
    for i in results:
        dict[result[i].place_id]] = result[i]
    return dict

json = str


return chooseone
