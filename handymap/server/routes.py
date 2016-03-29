from flask.ext.via.routers.default import Functional
from flask import render_template, send_file, request, abort

def index():
    return render_template('index.html')

def events():
    if request.is_xhr:
        return send_file('../test_data/events.json', 'JSON')
    else:
        abort(404)

def show_process(process):
    if request.is_xhr:
        return send_file('../test_data/%s.json', 'JSON') % process
    else:
        abort(404)

routes = [
    Functional('/', index),
    Functional('/api/events', events),
    # Functional('/api/russia/<process>', show_process)
]
