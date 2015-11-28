def json_make(json):
    result = {}
    result["shop_id"] = json.id
    result["location"] = json.geometry.location
    result["shop_name"] = json.name
    result["address"] = json.formatted_address
    result["phone_number"] = json.formatted_phone_number
    result["review_ave"] = json.user_ratings_total
    result["opentime"] = json.opening_hours
    result["reviews"] = json.reviews

    return json.dumps(result)

p = json.loads(str)
p = json.loads(str)
if p["status"]!="OK":
    return undefined

return json_make(p.result)
