"""Negative cases ensure the deployment gate actually rejects regressions."""
from pathlib import Path
import shutil
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from validate_site import ROOT, validate


class ValidationTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        shutil.copytree(ROOT / 'site', self.root / 'site')

    def tearDown(self):
        self.tmp.cleanup()

    def inject(self, text):
        path = self.root / 'site/index.html'
        path.write_text(path.read_text(encoding='utf-8').replace('</body>', text + '</body>'), encoding='utf-8')

    def test_baseline(self):
        self.assertEqual(validate(self.root), [])

    def test_missing_link_and_fragment(self):
        self.inject('<a href="missing.html">Missing</a><a href="#unknown">Anchor</a>')
        errors = validate(self.root)
        self.assertTrue(any('missing local resource' in e for e in errors))
        self.assertTrue(any('missing fragment' in e for e in errors))

    def test_inline_and_external_script(self):
        self.inject('<script>alert(1)</script><script src="https://example.com/a.js"></script>')
        errors = validate(self.root)
        self.assertTrue(any('inline script' in e for e in errors))
        self.assertTrue(any('forbidden external' in e for e in errors))

    def test_private_file(self):
        (self.root / 'site/.env').write_text('SAMPLE=value', encoding='utf-8')
        self.assertTrue(any('private/archive' in e for e in validate(self.root)))

    def test_case_sensitive_link(self):
        self.inject('<a href="LICENCIAS.html">Wrong case</a>')
        self.assertTrue(any('case sensitive' in e for e in validate(self.root)))

    def test_possible_token(self):
        (self.root / 'sample.txt').write_text('gh' + 'p_' + 'a' * 36, encoding='utf-8')
        self.assertTrue(any('possible secret' in e for e in validate(self.root)))


if __name__ == '__main__':
    unittest.main()
