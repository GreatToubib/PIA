import os
from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask_jsonpify import jsonify
import json
import sys
import base64
from PIL import Image
from io import BytesIO
import face_detect_cv3

# PORT=5002

app = Flask(__name__)
api = Api(app)
CORS(app)
print("server is starting", file=sys.stderr)

# ###############################################################################################   before first request, JSON data storage #################################################
@app.before_first_request
def before_first_request_func():
    print("This function will run once", file=sys.stderr)

    data = {}
    data['people'] = []
    data['people'].append({
        'name': 'PasEncoreDePost'
    })
    with open('data.txt', 'w+') as outfile:
        json.dump(data, outfile)

# ###############################################################################################   upload image #################################################
@app.route("/imageUpload", methods=["GET", "POST"])
def imageUpload():
    if request.method == 'POST':
        """modify/update the information for <user_id>"""
        print('imageUpload Post', file=sys.stderr)
        dataPOST = request.get_json()
        data = {}
        data['images'] = []
        data['images'].append({
            'name': dataPOST['name'],
            'format': dataPOST['format'],
            'base64': dataPOST['base64']

        })


        # filename = data['images'][0]['name']+'.'+data['images'][0]['format']
        filename = data['images'][0]['name']+'.png'
        im = Image.open(BytesIO(base64.b64decode(data['images'][0]['base64'])))
        im.save(filename, data['images'][0]['format'])

        filename= 'lastImgData.txt'
        with open(filename , 'w+') as outfile:
            json.dump(data, outfile)

        return dataPOST

    if request.method == 'GET':

        return jsonify({'text':"customers Get method"})


# ###############################################################################################  get Species, call IA model #################################################
@app.route("/getSpecies", methods=["GET", "POST"])
def getSpecies():
    if request.method == 'GET':
        print('get Species GET', file=sys.stderr)
        with open('lastImgData.txt') as json_file:
            data = json.load(json_file)
            filename= data['images'][0]['name']+'.png'

        # filename="abba.png"
        species=face_detect_cv3.countfaces(filename)+" faces "
        print('nbr de faces: '+species, file=sys.stderr)
        return jsonify({'species':species})



# ###############################################################################################  renvoyer vers index.html #################################################
@app.route("/", methods=["GET","POST"])
def home():
    if request.method=="GET":
        return render_template("index.html")



# ###############################################################################################   hello1, test de GET #################################################

@app.route("/hello1", methods=["GET"])
def hello1():
    if request.method == 'GET':
        print('hello1 GET', file=sys.stderr)
        with open('data.txt') as json_file:
            data = json.load(json_file)
            test= data['people'][0]['name']
        return jsonify({'text':test})


# ###############################################################################################  updata Data for test post #################################################
@app.route("/updateData", methods=["GET", "POST"])
def customers():
    if request.method == 'POST':
        """modify/update the information for <user_id>"""
        print('customers Post', file=sys.stderr)
        dataPOST = request.get_json()
        data = {}
        data['people'] = []
        data['people'].append({
            'name': dataPOST['test']
        })
        with open('data.txt', 'w+') as outfile:
            json.dump(data, outfile)

        return dataPOST

    if request.method == 'GET':

        return jsonify({'text':"customers Get method"})

if __name__ == '__main__':
   app.run(port=PORT)
   


