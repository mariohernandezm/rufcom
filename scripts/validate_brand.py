"""Structural checks for the brand contract; visual browser review remains required."""
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
NOTES = {'article-byline','source-note','pattern-note','price-note','simplex-source','repeater-share-status','repeater-zone-note','footer-credit'}
CARDS = {'card','ui-callout','article-callout','simple-path','hero-panel','simplex-reference','q-dialog','notice-box','adventure-note'}

class BrandPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack, self.errors = [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        classes = set(a.get('class','').split())
        in_scope = any(t in {'main','header','footer'} for t,c in self.stack)
        role = a.get('data-rf-role')
        expected = None
        if in_scope:
            if tag == 'h1':
                expected = 'page-title'
            elif tag == 'h2':
                card = any(c & CARDS or any(x.endswith('-card') for x in c) for t,c in self.stack)
                footer = any(t == 'footer' for t,c in self.stack)
                expected = 'card-title' if card or footer else 'section-title'
            elif tag in {'h3','h4','h5','h6'}:
                expected = 'card-title'
            elif tag == 'p':
                if classes & {'eyebrow','pattern-label'}:
                    expected = 'eyebrow'
                elif classes & NOTES or any(c & NOTES for t,c in self.stack) or a.get('id') == 'repeater-help':
                    expected = 'note'
                else:
                    expected = 'body'
            elif tag == 'figcaption':
                expected = 'note'
            elif tag in {'summary','label','button','input','select','textarea'}:
                expected = 'control'
            if tag == 'a' and any(t in {'h1','h2','h3','h4','h5','h6'} for t,c in self.stack) and role:
                self.errors.append('heading link must inherit its title role')
        if expected and role != expected:
            self.errors.append(f'{tag} {a.get("id",a.get("class",""))}: expected {expected}, found {role}')
        if tag not in VOID:
            self.stack.append((tag,classes))

    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i][0] == tag:
                self.stack = self.stack[:i]
                break

def validate_html(text):
    page = BrandPage()
    page.feed(text)
    return page.errors

def validate(root=ROOT):
    errors = []
    for path in (root/'site').glob('*.html'):
        errors.extend(f'{path.name}: {e}' for e in validate_html(path.read_text(encoding='utf-8')))
    for path in (root/'site').rglob('*.css'):
        if path.name == 'design-system.css':
            continue
        text = re.sub(r'/\*.*?\*/','',path.read_text(encoding='utf-8'),flags=re.S)
        if re.search(r'(?<![\w-])font-size\s*:',text):
            errors.append(f'{path.name}: page-local type scale forbidden')
    if not (root/'docs/manual-de-marca.md').is_file():
        errors.append('brand manual must accompany the source')
    return errors

if __name__ == '__main__':
    problems = validate()
    for problem in problems:
        print('ERROR: '+problem)
    if not problems:
        print('PASS: semantic brand roles and single shared type scale (visual review separate)')
    sys.exit(bool(problems))
