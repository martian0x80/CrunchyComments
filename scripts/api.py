from sanic import Sanic, text
from sanic_ext import Extend
from sanic.response import json
from extract import Extractor, restore_url
from sanic.log import logger

logger.setLevel('INFO')
logger.info('Starting API server')

app = Sanic(__name__)
app.config.API_VERSION = '1.0'
app.config.CORS_ORIGINS = "https://www.crunchyroll.com, http://localhost:8000"
Extend(app)

@app.route("/")
async def test(request):
    return json({"hello": "world"})

@app.route("/extract")
async def extract(request):
    url = request.args.get('url')
    extractor = Extractor(url)
    return json(extractor.extract())

@app.route("/restore")
async def restore(request):
    url = request.args.get('url')
    if url is None:
        return json({"error": "URL not provided"})
    if 'crunchyroll.com' not in url:
        return json({"error": "Invalid URL"})
    if 'web.archive.org' in url:
        return json({"error": "Invalid URL. Needs to be a crunchyroll.com URL"})
    return json(restore_url(url))
    # return text('hi')

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=False)
