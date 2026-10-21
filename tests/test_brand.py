"""Guard against the role and cascade regressions found in the brand review."""
from pathlib import Path
import sys
import unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from validate_brand import validate_html

class BrandTests(unittest.TestCase):
    def test_full_guide_sections_cannot_be_card_titles(self):
        self.assertTrue(validate_html('<main><section class="guide-step"><h2 data-rf-role="card-title">Antes de salir</h2></section></main>'))
        self.assertEqual(validate_html('<main><section class="guide-step"><h2 data-rf-role="section-title">Antes de salir</h2></section></main>'),[])

    def test_card_heading_uses_component_role_even_with_h2(self):
        self.assertTrue(validate_html('<main><article class="q-card"><h2 data-rf-role="section-title">QSL</h2></article></main>'))
        self.assertEqual(validate_html('<main><article class="q-card"><h2 data-rf-role="card-title">QSL</h2></article></main>'),[])

    def test_author_and_nested_source_copy_remain_notes(self):
        self.assertTrue(validate_html('<main><div class="source-note"><p data-rf-role="body">Fuente</p></div></main>'))
        self.assertEqual(validate_html('<main><p class="article-byline" data-rf-role="note">Por Rufcom</p></main>'),[])

    def test_title_links_do_not_receive_control_size(self):
        self.assertTrue(validate_html('<main><h3 data-rf-role="card-title"><a data-rf-role="control">Guía</a></h3></main>'))
        self.assertEqual(validate_html('<main><h3 data-rf-role="card-title"><a>Guía</a></h3></main>'),[])

if __name__ == '__main__':unittest.main()
