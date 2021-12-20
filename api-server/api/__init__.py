from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from api.config import PROD_DB 

app = Flask(__name__)

# POSTGRES = {
#     'user': 'yang',
#     'password': '123456',
#     'db': 'ftx_data',
#     'host': 'localhost',
#     'port': '5432',
# }

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://yang:123456@IP:5432/ftx_data"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\%(password)s@%(host)s:%(port)s/%(db)s' % POSTGRES
app.config['SQLALCHEMY_DATABASE_URI'] = PROD_DB
db = SQLAlchemy(app)

from api import routes