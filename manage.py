from flask.ext.script import Manager, Server
from flask_failsafe import failsafe


from handymap import app

manager = Manager(app)

@failsafe
def create_app():
    from handymap import app
    return app.app

manager = Manager(create_app)
manager.add_command("runserver", Server())


if __name__ == '__main__':
    manager.run()
