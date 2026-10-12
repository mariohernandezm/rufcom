"""Verify the deployed HTML of every canonical URL in this commit's sitemap."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlsplit
from time import sleep
import sys
import xml.etree.ElementTree as ET

SITE = Path(__file__).resolve().parents[1] / 'site'


def verify(url):
    parsed = urlsplit(url)
    if parsed.scheme != 'https' or parsed.netloc != 'rufcom.cl' or parsed.query or parsed.fragment:
        raise ValueError('unexpected sitemap URL')
    path = SITE / (parsed.path.lstrip('/') or 'index.html')
    path.resolve().relative_to(SITE.resolve())
    expected = path.read_bytes().replace(b'\r\n', b'\n').strip()
    for attempt in range(5):
        try:
            with urlopen(url, timeout=25) as response:
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
    print(f'PASS: all {len(urls)} canonical pages match the validated commit')
