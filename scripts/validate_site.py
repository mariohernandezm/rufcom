"""Offline validation of the public site; standard library only.

This is a focused structural/security check, not a full HTML conformance
validator or comprehensive credential scanner. GitHub secret scanning and
manual review remain necessary before pushing a public repository.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import posixpath
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
CSP = "default-src 'none'; script-src 'self' https://www.googletagmanager.com; style-src 'self'; img-src 'self' https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self'; connect-src https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'"


class Page(HTMLParser):
    def __init__(self, name):
        super().__init__(convert_charrefs=True)
        self.name, self.ids, self.refs, self.errors = name, set(), [], []
        self.csp = self.description = self.viewport = self.title = False
        self.canonical, self.h1 = None, 0
        self.lang = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html':
            self.lang = a.get('lang')
        if 'id' in a:
            if a['id'] in self.ids:
                self.errors.append(f'duplicate id: {a["id"]}')
            self.ids.add(a['id'])
        if any(key.startswith('on') for key in a) or 'style' in a:
            self.errors.append('inline handler/style forbidden')
        if tag in {'base', 'iframe', 'object', 'embed', 'form', 'style'}:
            self.errors.append(f'forbidden element: {tag}')
        if tag == 'script' and not a.get('src'):
            self.errors.append('inline script forbidden')
        if tag == 'img' and 'alt' not in a:
            self.errors.append('image missing alt')
        if tag == 'a' and a.get('target') == '_blank' and 'noopener' not in a.get('rel', '').split():
            self.errors.append('external window missing noopener')
        if tag == 'meta':
            if a.get('http-equiv', '').lower() == 'content-security-policy':
                self.csp = a.get('content') == CSP
            if a.get('name') == 'description':
                self.description = bool(a.get('content'))
            if a.get('name') == 'viewport':
                self.viewport = bool(a.get('content'))
        if tag == 'title':
            self.title = True
        if tag == 'h1':
            self.h1 += 1
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = a.get('href')
        for key in ('href', 'src'):
            if key in a:
                resource = tag != 'a' and not (tag == 'link' and a.get('rel') == 'canonical')
                self.refs.append((a[key], resource))

    handle_startendtag = handle_starttag


def validate(root=ROOT):
    site = (root / 'site').resolve()
    errors, pages = [], {}
    files = {p.relative_to(site).as_posix(): p for p in site.rglob('*') if p.is_file()}
    for name in ('index.html', '404.html', 'robots.txt', 'sitemap.xml'):
        if name not in files:
            errors.append(f'missing required file: {name}')
    allowed = {'.html', '.css', '.js', '.svg', '.webp', '.png', '.jpg', '.ico', '.woff2', '.txt', '.xml'}
    for p in site.rglob('*'):
        if p.is_symlink() or any(part.startswith('.') for part in p.relative_to(site).parts):
            errors.append(f'hidden file or symlink in site: {p.relative_to(site)}')
        if p.is_file() and p.suffix.lower() not in allowed:
            errors.append(f'unsupported public file: {p.name}')
    for name, p in files.items():
        if p.suffix == '.html':
            page = Page(name)
            page.feed(p.read_text(encoding='utf-8'))
            pages[name] = page
            errors.extend(f'{name}: {e}' for e in page.errors)
            if not all([page.csp, page.description, page.viewport, page.title, page.lang == 'es', page.h1 == 1]):
                errors.append(f'{name}: missing/invalid CSP, language, description, viewport, title or h1')
            expected = 'https://rufcom.cl/' + ('' if name == 'index.html' else name)
            if name != '404.html' and page.canonical != expected:
                errors.append(f'{name}: invalid canonical URL')

    def check_ref(name, ref, resource):
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            if url.scheme not in {'https', 'mailto', 'tel'} or resource:
                errors.append(f'{name}: forbidden external/insecure reference: {ref}')
            return
        path = unquote(url.path)
        target_name = posixpath.normpath(path.lstrip('/') if path.startswith('/') else posixpath.join(posixpath.dirname(name), path)) if path else name
        if target_name == '..' or target_name.startswith('../'):
            errors.append(f'{name}: path escapes site: {ref}')
            return
        target = (site / target_name).resolve()
        if target.is_dir():
            target /= 'index.html'
            target_name = posixpath.join(target_name, 'index.html').removeprefix('./')
        try:
            target.relative_to(site)
        except ValueError:
            errors.append(f'{name}: path escapes site: {ref}')
            return
        if target_name not in files:
            errors.append(f'{name}: missing local resource (case sensitive): {ref}')
        elif url.fragment and target_name in pages and unquote(url.fragment) not in pages[target_name].ids:
            errors.append(f'{name}: missing fragment: {ref}')

    for name, page in pages.items():
        for ref, resource in page.refs:
            check_ref(name, ref, resource)
    for name, p in files.items():
        if p.suffix == '.css':
            content = p.read_text(encoding='utf-8')
            if '@import' in content:
                errors.append(f'{name}: CSS imports forbidden')
            for match in re.finditer(r'url\(\s*[\'"]?([^\)\'"\s]+)', content):
                check_ref(name, match[1], True)
        if p.suffix == '.svg':
            tree = ET.fromstring(p.read_text(encoding='utf-8'))
            for element in tree.iter():
                if element.tag.split('}')[-1] in {'script', 'foreignObject'}:
                    errors.append(f'{name}: active SVG content')
                for key, value in element.attrib.items():
                    attr = key.split('}')[-1]
                    if attr.startswith('on') or (attr == 'href' and not value.startswith('#')):
                        errors.append(f'{name}: active SVG attribute')
    try:
        sitemap = ET.parse(site / 'sitemap.xml')
        urls = {e.text for e in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
        expected = {p.canonical for name, p in pages.items() if name != '404.html'}
        if urls != expected:
            errors.append('sitemap does not match canonical pages')
    except (OSError, ET.ParseError):
        errors.append('missing or invalid sitemap')

    # Do not print matched values: reports must not reveal a possible secret.
    signatures = [r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
                  r'gh[pousr]_[A-Za-z0-9]{36,}', r'github_pat_[A-Za-z0-9_]{50,}',
                  r'AKIA[0-9A-Z]{16}']
    for p in root.rglob('*'):
        if not p.is_file() or any(part in {'.git', '__pycache__', 'node_modules', '.venv'} for part in p.relative_to(root).parts):
            continue
        if p.name == '.env' or p.name.startswith('.env.') or p.suffix in {'.pem', '.key', '.pfx', '.p12', '.zip'}:
            errors.append(f'private/archive file in repository: {p.relative_to(root)}')
        if p.suffix in {'.html', '.css', '.js', '.py', '.yml', '.md', '.txt', '.svg'}:
            if any(re.search(pattern, p.read_text(encoding='utf-8')) for pattern in signatures):
                errors.append(f'possible secret in {p.relative_to(root)}')
    return errors


if __name__ == '__main__':
    issues = validate()
    for issue in issues:
        print('ERROR:', issue)
    if issues:
        sys.exit(1)
    print('PASS: local references, CSP, public file rules, metadata, SVG and basic secret checks')
