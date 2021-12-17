from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app = Flask(__name__)

POSTGRES = {
    'user': 'yang',
    'password': '123456',
    'db': 'ftx_data',
    'host': 'localhost',
    'port': '5432',
}

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://yang:123456@IP:5432/ftx_data"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\%(password)s@%(host)s:%(port)s/%(db)s' % POSTGRES
db = SQLAlchemy(app)

from api import routes