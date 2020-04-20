from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from flask_jsonpify import jsonify
import json
import sys
import base64
from PIL import Image
from io import BytesIO

PORT=5002

app = Flask(__name__)
api = Api(app)
CORS(app)


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


@app.route("/hello1", methods=["GET"])
def hello1():
    if request.method == 'GET':
        print('hello1 GET', file=sys.stderr)
        with open('data.txt') as json_file:
            data = json.load(json_file)
            test= data['people'][0]['name']
        return jsonify({'text':test})



@app.route("/customers", methods=["GET", "POST"])
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


        filename = "image."+ data['images'][0]['format']
        im = Image.open(BytesIO(base64.b64decode(data['images'][0]['base64'])))
        im.save(filename, data['images'][0]['format'])



        # # filename = data['images'][0]['name']  # new img everytime
        # filename = "image."+ data['images'][0]['format']  # same file everytime and overwrite
        # with open(filename, 'w+') as f:
        #     f.write(imgdata)


        with open('imagee.txt', 'w+') as outfile:
            json.dump(data, outfile)

        return dataPOST

    if request.method == 'GET':

        return jsonify({'text':"customers Get method"})


@app.route("/", methods=["GET","POST"])
def home():
    if request.method=="GET":
        return render_template("index.html")

class Employees(Resource):
    def get(self):
        return {'employees': [{'id':1, 'name':'Balram'},{'id':2, 'name':'Tom'}]}

class Employees_Name(Resource):
    def get(self, employee_id):
        print('Employee id:' + employee_id)
        result = {'data': {'id':1, 'name':'Balram'}}
        return jsonify(result)


api.add_resource(Employees, '/employees') # Route_1
api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3

if __name__ == '__main__':
   app.run(port=PORT)


