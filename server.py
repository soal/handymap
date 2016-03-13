#!/usr/bin/env python
from flask_failsafe import failsafe

@failsafe
def run_app():
    from app import app
    return app

run_app().run(debug = True)
