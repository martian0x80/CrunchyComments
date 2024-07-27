import requests
from sanic import Sanic, text
from sanic_ext import Extend
from sanic.response import json
from extract import Extractor, restore_url
from sanic.log import logger
from count import count

Sanic.start_methods = 'fork'

app = Sanic(__name__)
app.config.API_VERSION = '1.0'
app.config.CORS_ORIGINS = "https://www.crunchyroll.com, http://localhost:8000"
app.configure_logging = True
Extend(app)

logger.setLevel('INFO')
logger.info('Starting API server')

@app.route("/")
async def test(request):
    return json({"hello": "world"})

@app.route("/extract")
async def extract(request):
    url = request.args.get('url')
    extractor = Extractor(url)
    return json(extractor.extract())

@app.route("/count")
async def getcount(request):
    return json(count())

@app.route("/restore")
async def restore(request):
    url = request.args.get('url')
    if url is None:
        return json({"error": "URL not provided"})
    if 'crunchyroll.com' not in url:
        return json({"error": "Invalid URL"})
    if 'web.archive.org' in url:
        return json({"error": "Invalid URL. Needs to be a crunchyroll.com URL"})
    try:
        data = json(restore_url(url))
        return data
    except:
        return json({"message": "No archived comments found", 'status': 'failed', 'url': url})
    # return text('hi')


if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=False, workers=1)
