import requests as req 
 
 
 
def main(t):
    keyid = "AIzaSyCT_1vO2SmSjSFKTpsPJTvR1flLjSOpC-w"
    url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="\
    + str(t) + "&key=" \
    + keyid
    r=req.get(url)
    return r.text
 
 
if __name__=="__main__":
    main() 
 
