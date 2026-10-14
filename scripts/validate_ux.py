"""Check the agreed routes and shared navigation; no external dependencies."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import json

ROOT = Path(__file__).resolve().parents[1]


class Routes(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.navigation = False
        self.main = False
        self.lookup_links = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'main':
            self.main = True
        if tag == 'nav' and attrs.get('id') == 'mainNav':
            self.navigation = True
        if tag == 'a':
            href = attrs.get('href', '')
            if self.main:
                self.links.append(urlsplit(href).path)
            if self.navigation and href == 'buscador-licencias.html':
                self.lookup_links += 1

    def handle_endtag(self, tag):
        if tag == 'main':
            self.main = False
        if tag == 'nav':
            self.navigation = False


def validate(root=ROOT):
    pages = json.loads((root / 'scripts/seo_pages.json').read_text(encoding='utf-8'))
    errors = []
    library = Routes()
    library.feed((root / 'site/guias.html').read_text(encoding='utf-8'))
    for name, info in pages.items():
        text = (root / 'site' / name).read_text(encoding='utf-8')
        page = Routes()
        page.feed(text)
        if page.lookup_links != 1:
            errors.append(f'{name}: missing or duplicate static license lookup in navigation')
        if info['type'] == 'Article' and 'aria-label="Índice de la guía"' not in text:
            errors.append(f'{name}: article missing a local index')
        if name not in {'index.html', 'guias.html', 'privacidad.html'} and name not in library.links:
            errors.append(f'{name}: resource missing from the guide library')
    home = (root / 'site/index.html').read_text(encoding='utf-8')
    if home.count('src="assets/images/ruffis-seal-transparent-lossless.webp') != 2:
        errors.append('index.html: use one small seal and one explanatory seal')
    if 'id="descargas-inicio"' not in home or 'id="descargas"' not in (root / 'site/guias.html').read_text(encoding='utf-8'):
        errors.append('downloads must remain visible in Home and Guides')
    return errors


if __name__ == '__main__':
    errors = validate()
    if errors:
        print('\n'.join(errors))
        raise SystemExit(1)
    print('PASS: complete library, article indexes, static lookup access and prominent downloads')
