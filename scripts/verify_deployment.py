"""Verify the deployed HTML of every canonical URL in this commit's sitemap."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import build_opener, HTTPRedirectHandler
from urllib.error import HTTPError
from validate_site import RETIRED_URLS
from urllib.parse import urlsplit
from time import sleep
import sys
import xml.etree.ElementTree as ET

SITE = Path(__file__).resolve().parents[1] / 'site'

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = build_opener(NoRedirect)

def verify_retired(name):
    url = 'https://rufcom.cl/' + name
    for attempt in range(5):
        try:
            with opener.open(url, timeout=25):
                pass
            raise ValueError('retired URL must return HTTP 404')
        except HTTPError as error:
            if error.code == 404:
                return url
            if attempt == 4:
                raise
        except (OSError, ValueError):
            if attempt == 4:
                raise
        sleep(10)


def verify(url):
    parsed = urlsplit(url)
    if parsed.scheme != 'https' or parsed.netloc != 'rufcom.cl' or parsed.query or parsed.fragment:
        raise ValueError('unexpected sitemap URL')
    path = SITE / (parsed.path.lstrip('/') or 'index.html')
    path.resolve().relative_to(SITE.resolve())
    expected = path.read_bytes().replace(b'\r\n', b'\n').strip()
    for attempt in range(5):
        try:
            with opener.open(url, timeout=25) as response:
                if response.status != 200 or response.geturl() != url:
                    raise ValueError('canonical URL must load directly with HTTP 200')
                actual = response.read().replace(b'\r\n', b'\n').strip()
            if actual != expected:
                raise ValueError('published HTML differs from validated commit')
            return url
        except (OSError, ValueError):
            if attempt == 4:
                raise
            sleep(10)


if __name__ == '__main__':
    urls = [node.text for node in ET.parse(SITE / 'sitemap.xml').iter()
            if node.tag.endswith('}loc')]
    if not urls or len(urls) != len(set(urls)):
        sys.exit('ERROR: empty sitemap or duplicate URLs')
    with ThreadPoolExecutor(max_workers=4) as pool:
        for url in pool.map(verify, urls):
            print('PASS:', url)
    for name in sorted(RETIRED_URLS):
        print('PASS: HTTP 404:', verify_retired(name))
    print(f'PASS: all {len(urls)} canonical pages load directly and match the validated commit')
