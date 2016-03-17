from flask import Flask, render_template, url_for, send_file

app = Flask(__name__)

app.jinja_env.globals['static'] = (
    lambda filename: url_for('static', filename = filename)
)

app.debug = True

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/events')
def events():
  return send_file('test_data/events.json', 'JSON')

@app.route('/russia/<process>')
def show_process(process):
  return send_file('test_data/%s.json', 'JSON') % process
