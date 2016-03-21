#!/usr/bin/env python

import unittest, coverage

from flask.ext.script import Manager, Server
from flask_failsafe import failsafe

from handymap.server import app


COV = coverage.coverage(
    branch=True,
    include='handymap/server/*',
    omit=[
        'handymap/server/tests/*',
        'handymap/server/config.py',
        'handymap/server/*/__init__.py'
    ]
)
COV.start()

manager = Manager(app)


@failsafe
def create_app():
    return app

manager = Manager(create_app)
manager.add_command("runserver", Server())

@manager.command
def test():
    """Runs the unit tests without coverage."""
    tests = unittest.TestLoader().discover('handymap/server/tests', pattern='*test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    else:
        return 1

@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('handymap/server/tests', pattern='*test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        try:
            COV.report()
        except coverage.misc.CoverageException as ce:
            print(ce)
        return 0
    else:
        return 1


if __name__ == '__main__':
    manager.run()
