from api import db
from sqlalchemy.ext.declarative import DeclarativeMeta
from flask.json import JSONEncoder


class PaymentInfo(db.Model):
    __tablename__ = 'funding_payments'
    id = db.Column(db.Integer, primary_key=True)
    future = db.Column(db.Text)
    payment = db.Column(db.Numeric)
    time = db.Column(db.DateTime)
    rate = db.Column(db.Numeric)

    def __repr__(self):
        return f"PaymentInfo('{self.id}', '{self.future}', '{self.payment}', '{self.time}', '{self.rate}')"
   