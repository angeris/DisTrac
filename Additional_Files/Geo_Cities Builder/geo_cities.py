import re;
from pymongo import MongoClient;

f = open('cities5000.txt', 'r');

client = MongoClient('mongodb://root:pwd@104.236.186.213');

db = client.DisTrac;
collection = db['geo_cities'];

posts = [];

for line in f:
    case = re.split('\t', line);
    posts.append({
        "geonameid":          case[0],
        "name":               case[1],
        "asciiname":          case[2],
        "alternatenames":     case[3],
        "location":           {"type": "Point",
            "coordinates": [float(case[5]), float(case[4])]},
        "featureclass":       case[6],
        "featurecode":        case[7],
        "countrycode":        case[8],
        "cc2":                case[9],
        "population":         case[14],
        "elevation":          case[15],
        "dem":                case[16],
        "timezone":           case[17],
        "modificationdate":   case[18]
    });

collection.insert(posts);
