from flask import render_template
from app import app

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/ololo')
def ololo():
  return render_template('ololo.html')
