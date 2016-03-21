from flask import Flask, render_template, url_for, send_file, request, abort

app = Flask(
    __name__,
    template_folder='templates',
    static_folder='../client/static'
)

app.jinja_env.globals['static'] = (
    lambda filename: url_for('static', filename = filename)
)

app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/events')
def events():
    if request.is_xhr:
        return send_file('test_data/events.json', 'JSON')
    else:
        abort(404)

@app.route('/russia/<process>')
def show_process(process):
    if request.is_xhr:
        return send_file('test_data/%s.json', 'JSON') % process
    else:
        abort(404)

# @app.route('/templates/<name>')
# def send_template(name):
#     if request.is_xhr:
#         return send_file('frontend/templates/%s.mustache' % name, 'text/html')
#     else:
#         abort(404)