# api.py
import os
from flask import Flask
import csv, json

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
data_file = os.path.join(basedir, 'placement_data.csv')

with open(data_file) as csvFile:
        data = {}
        csvReader = csv.DictReader(csvFile)
        for row in csvReader:
            restOfRow = {'sl_no': row['sl_no'], 'gender': row['gender'], 'ssc_p': row['ssc_p'], 
                        'ssc_b': row['ssc_b'], 'hsc_p': row['hsc_p'], 
                        'hsc_b': row['hsc_b'], 'hsc_s': row['hsc_s'], 
                        'degree_p': row['degree_p'], 'degree_t': row['degree_t'],
                        'workex': row['workex'], 'etest_p': row['etest_p'], 
                        'specialisation': row['specialisation'], 'mba_p': row['mba_p'],
                        'status': row['status'], 'salary': row['salary']}
            data.update( {row['sl_no']: restOfRow} )

@app.route('/get_data') 
def get_data():
    return data