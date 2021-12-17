import json, datetime
import pandas as pd
from api import app, db, ftx_call
from api.models import PaymentInfo
from sqlalchemy import func
from flask import jsonify


@app.route('/')
def index():
    
    ftx = ftx_call.api
    data = json.dumps(ftx.get_funding_payment())
    return '{}'.format(data) 


@app.route('/insert_data')
def insert_data():

    ftx = ftx_call.api
    res = db.session.query(func.max(PaymentInfo.id).label('max_id_in_db')).one()
    data_list = []
    
    for data in ftx.get_funding_payment():
        if data['id'] > res.max_id_in_db:
            payment_info = PaymentInfo(id=data['id'], future=data['future'], payment=data['payment'], time=data['time'], rate=data['rate'])
            data_list.append(payment_info)
    # print(len(data_list))
    db.session.add_all(data_list)
    db.session.commit()
    # data = json.dumps(ftx.get_funding_payment())
    return ' commit done'

@app.route('/get_fundingpayments')
def get_fundingpayments():
    query = PaymentInfo.query.limit(10).all()
    def row2dict(row):
        list_for_json = []
        for column in row:
            dict_for_json = {}
            payment_info_items = (column.__mapper__.c.items())
            for i in range(len(payment_info_items)):
                if payment_info_items[i][0] == "id":
                    dict_for_json[payment_info_items[i][0]] = getattr(column, payment_info_items[i][0])
                else:
                    dict_for_json[payment_info_items[i][0]] = str(getattr(column, payment_info_items[i][0]))
            list_for_json.append(dict_for_json)    
        return list_for_json
    return jsonify(row2dict(query))
    # return jsonify(row2dict(query))

@app.route('/get_balance')
def get_balance():
    ftx = ftx_call.api
    balance_info = ftx.get_balances()
    total_value = 0
    for item in balance_info:
        total_value += item['usdValue']
    account_info = ftx.get_account_info()
    res = {}
    res["total_balance"] = round(total_value,3)
    res["balance_all_info"] = balance_info
    return jsonify(res)

@app.route('/get_balance_info')
def get_balance_info():
    ftx = ftx_call.api
    balance_info = ftx.get_balances()
    total_value = 0
    for item in balance_info:
        total_value += item['usdValue']
    account_info = ftx.get_account_info()
    res = {}
    res["total_balance"] = round(total_value,3)
    res["balance_all_info"] = balance_info
    return jsonify(res)


@app.route('/get_portfolios/<period>')
def get_portfolios(period):
    
    def create_history_price_df(period):
        ftx = ftx_call.api
        end_time = datetime.datetime.now().timestamp()
        account_info = pd.DataFrame(ftx.get_balances())
        close_price_df = pd.DataFrame()
        account_info.set_index("coin", inplace=True)  
        mask_usd_df = pd.DataFrame(account_info[(account_info.index != "USD") & (account_info.index != "USDT") & (account_info.index != "MER")])
        markets = mask_usd_df.index.tolist()

        for market in markets:
            json_data_from_ftx = ftx.get_market_price_history(market='{}/USDT'.format(market), 
                        resolution=86400, 
                        start_time=end_time-(86400*int(period)), 
                        end_time=end_time)
            df_data = pd.DataFrame(json_data_from_ftx)
            close_price_df[market+'_value'] = df_data["close"] * account_info.loc[market, 'total']
        close_price_df['USDT'] = account_info.loc['USDT', 'total']
        close_price_df['sum'] = close_price_df.sum(axis=1)
        return(close_price_df)
    
    df = create_history_price_df(period)
    history_close_price = df.to_dict(orient='records')
    return jsonify(history_close_price)
