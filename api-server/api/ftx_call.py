from api import ftx_client, config

api = ftx_client.FtxClient(api_key=config.subaccount_apiKey,
                       api_secret=config.subaccount_apiSecret,
                       subaccount_name="spot-perpetual")