from flask.ext.via.routers.default import Functional
from flask import render_template, send_file, request, abort

def index():
    return render_template('index.html')

def events():
    if request.is_xhr:
        return send_file('../test_data/facts.json', 'application/json')
    else:
        abort(404)

def show_process(process):
    if request.is_xhr:
        return send_file('../test_data/%s.json', 'application/json') % process
    else:
        abort(404)

def map_style():
    return send_file('../static/mapstyle.json', 'application/json')

routes = [
    Functional('/', index),
    Functional('/api/facts', events),
    # Functional('/api/russia/<process>', show_process)
]
