"""Regression checks for the permanent SEO publishing gate."""
from pathlib import Path
import json
import shutil
import sys
import tempfile
import unittest

sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from seo import ROOT, run


class SEOTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.root=Path(self.tmp.name)
        shutil.copytree(ROOT/'site',self.root/'site')
        (self.root/'scripts').mkdir()
        shutil.copy(ROOT/'scripts/seo_pages.json',self.root/'scripts/seo_pages.json')

    def tearDown(self): self.tmp.cleanup()

    def test_baseline_and_idempotent_generation(self):
        self.assertEqual(run(self.root),[])
        self.assertEqual(run(self.root,check=False),[])
        self.assertEqual(run(self.root),[])

    def test_new_page_requires_configuration_and_incoming_link(self):
        source=(self.root/'site/chirp.html').read_text(encoding='utf-8')
        (self.root/'site/new-guide.html').write_text(source,encoding='utf-8')
        self.assertTrue(any('cover every canonical' in e for e in run(self.root)))
        config_path=self.root/'scripts/seo_pages.json'
        config=json.loads(config_path.read_text(encoding='utf-8'))
        config['new-guide.html']=config['chirp.html']
        config_path.write_text(json.dumps(config),encoding='utf-8')
        self.assertTrue(any('no incoming internal link' in e for e in run(self.root)))

    def test_changed_title_requires_social_and_schema_refresh(self):
        path=self.root/'site/chirp.html'
        text=path.read_text(encoding='utf-8').replace('<title>Cómo programar','<title>Guía para programar')
        path.write_text(text,encoding='utf-8')
        self.assertTrue(any('stale or missing' in e for e in run(self.root)))

    def test_future_date_and_missing_image_rejected(self):
        path=self.root/'scripts/seo_pages.json'
        config=json.loads(path.read_text(encoding='utf-8'))
        config['chirp.html']['modified']='2999-01-01'
        config['codigo-q.html']['image']='assets/images/absent.png'
        path.write_text(json.dumps(config),encoding='utf-8')
        errors=run(self.root)
        self.assertTrue(any('future editorial date' in e for e in errors))
        self.assertTrue(any('missing sharing image' in e for e in errors))


if __name__=='__main__':unittest.main()
