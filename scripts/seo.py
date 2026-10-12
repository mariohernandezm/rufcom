"""Generate static social metadata and schema.org microdata; --check is the CI gate.

No browser JavaScript, network access, or CSP changes are needed. Editorial
dates are explicit in seo_pages.json and never refreshed automatically.
"""
from pathlib import Path
from html import escape, unescape
from datetime import date
import argparse
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://rufcom.cl/'
MONTHS = ('enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre').split()


def clean(text):
    text = re.sub(r'<!-- SEO:HEAD -->.*?<!-- /SEO:HEAD -->\s*', '', text, flags=re.S)
    text = re.sub(r'\n?<!-- SEO:SCHEMA -->.*?<!-- /SEO:SCHEMA -->\s*', '', text, flags=re.S)
    text = re.sub(r'<!-- SEO:BYLINE -->.*?<!-- /SEO:BYLINE -->', '', text, flags=re.S)
    return re.sub(r'(<main\b[^>]*?) itemscope itemtype="https://schema.org/(?:Article|WebPage)"', r'\1', text)


def render(text, name, info):
    text = clean(text)
    title = unescape(re.search(r'<title>(.*?)</title>', text, re.S)[1]).strip()
    description = unescape(re.search(r'<meta name="description" content="([^"]+)"', text)[1])
    url = ORIGIN + ('' if name == 'index.html' else name)
    image = ORIGIN + info['image']
    article = info['type'] == 'Article'
    meta = {
        'og:locale': 'es_CL', 'og:site_name': 'RUFCOM',
        'og:type': 'article' if article else 'website', 'og:title': title,
        'og:description': description, 'og:url': url, 'og:image': image,
        'og:image:alt': title.removesuffix(' | RUFCOM'),
    }
    if article:
        meta['article:modified_time'] = info['modified']
    head = '<!-- SEO:HEAD -->\n' + '\n'.join(
        f'<meta property="{key}" content="{escape(value, quote=True)}">' for key, value in meta.items())
    head += '\n' + '\n'.join(f'<meta name="{key}" content="{escape(value, quote=True)}">' for key, value in {
        'twitter:card': 'summary_large_image', 'twitter:title': title,
        'twitter:description': description, 'twitter:image': image,
        'twitter:image:alt': meta['og:image:alt'],
    }.items()) + '\n<!-- /SEO:HEAD -->\n'
    text = text.replace('</head>', head + '</head>', 1)
    props = {'headline' if article else 'name':title.removesuffix(' | RUFCOM'),
             'description': description, 'url': url, 'image': image, 'inLanguage':'es-CL'}
    schema = '<!-- SEO:SCHEMA -->\n' + ''.join(
        f'<meta itemprop="{key}" content="{escape(value, quote=True)}">\n' for key,value in props.items())
    schema += '<!-- /SEO:SCHEMA -->\n'
    text = re.sub(r'<main\b([^>]*)>', lambda m: f'<main{m[1]} itemscope itemtype="https://schema.org/{info["type"]}">\n'+schema, text, count=1)
    if article:
        modified = date.fromisoformat(info['modified'])
        label = f'{modified.day} de {MONTHS[modified.month-1]} de {modified.year}'
        byline = ('<!-- SEO:BYLINE --><p class="article-byline">Por '
                  '<span itemprop="author" itemscope itemtype="https://schema.org/Organization">'
                  '<a itemprop="url" href="/"><span itemprop="name">RUFCOM</span></a></span>'
                  f' · Última edición: <time itemprop="dateModified" datetime="{info["modified"]}">{label}</time>'
                  '</p><!-- /SEO:BYLINE -->')
        text = re.sub(r'(</h1>)', lambda m:m[1]+byline, text, count=1)
    return text


def run(root=ROOT, check=True):
    site = root/'site'
    config = json.loads((root/'scripts/seo_pages.json').read_text(encoding='utf-8'))
    pages = {p.name:p for p in site.glob('*.html') if p.name!='404.html'}
    issues = []
    if set(pages) != set(config):
        issues.append('seo_pages.json must cover every canonical page and exclude retired URLs')
    titles, descriptions = {}, {}
    for name, path in pages.items():
        if name not in config: continue
        text = path.read_text(encoding='utf-8')
        info = config[name]
        try:
            if info['type'] not in {'Article','WebPage'}: raise ValueError('unsupported schema type')
            image = (site/info['image']).resolve()
            image.relative_to(site.resolve())
            if not image.is_file(): raise ValueError('missing sharing image')
            if info['type']=='Article':
                modified = date.fromisoformat(info['modified'])
                if modified > date.today(): raise ValueError('future editorial date')
            expected = render(text, name, info)
        except (KeyError, ValueError, TypeError) as exc:
            issues.append(f'{name}: invalid SEO settings ({exc})'); continue
        if check and expected != text: issues.append(f'{name}: stale or missing SEO; run python scripts/seo.py')
        if not check and expected != text: path.write_text(expected,encoding='utf-8',newline='')
        for field, pattern, seen in [('title',r'<title>(.*?)</title>',titles),('description',r'<meta name="description" content="([^"]+)"',descriptions)]:
            value = unescape(re.search(pattern,text,re.S)[1]).strip()
            if value in seen: issues.append(f'{name}: duplicate {field} with {seen[value]}')
            seen[value]=name
        if re.search(r'<meta\b[^>]*name=[\'"]robots[\'"][^>]*content=[\'"][^\'"]*noindex',text,re.I):
            issues.append(f'{name}: canonical page cannot be noindex')
        if name != 'index.html' and not any(
            re.search(r'href="'+re.escape(name)+r'(?:#[^"]*)?"',other.read_text(encoding='utf-8'))
            for other_name,other in pages.items() if other_name!=name):
            issues.append(f'{name}: no incoming internal link')
    return issues


if __name__=='__main__':
    parser=argparse.ArgumentParser(); parser.add_argument('--check',action='store_true')
    args=parser.parse_args(); issues=run(check=args.check)
    for issue in issues: print('ERROR:',issue)
    if issues: sys.exit(1)
    print('PASS: static SEO, unique metadata, schema, real dates, sharing images and incoming links')
