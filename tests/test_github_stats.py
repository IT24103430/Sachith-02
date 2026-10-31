import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
import xml.etree.ElementTree as ET


SCRIPTS = Path(__file__).resolve().parents[1] / ".github" / "scripts"
spec = importlib.util.spec_from_file_location("github_stats", SCRIPTS / "generate_github_stats.py")
stats = importlib.util.module_from_spec(spec)
with patch.object(sys, "path", [str(SCRIPTS), *sys.path]):
    spec.loader.exec_module(stats)


class GitHubStatsTests(unittest.TestCase):
    def test_totals_exclude_upstream_fork_metrics_and_private_repositories(self):
        repositories = [
            {"name": "original", "fork": False, "private": False, "stargazers_count": 3, "forks_count": 2},
            {"name": "other", "fork": False, "private": False, "stargazers_count": 4, "forks_count": 1},
            {"name": "upstream", "fork": True, "private": False, "stargazers_count": 999, "forks_count": 500},
            {"name": "private", "fork": False, "private": True, "stargazers_count": 10, "forks_count": 10},
        ]
        with patch.object(stats, "api_get", return_value={"public_repos": 3, "followers": 5}), \
             patch.object(stats, "fetch_repositories", return_value=repositories), \
             patch.object(stats, "fetch_languages", return_value={"Python": 100}) as languages:
            result = stats.collect_stats("example")
        self.assertEqual(result, {"repositories": 3, "stars": 7, "forks": 3, "followers": 5,
                                  "languages": {"Python": 200}})
        self.assertEqual({call.args[1] for call in languages.call_args_list}, {"original", "other"})

    def test_language_percentages_include_bytes_outside_top_six(self):
        svg = stats.render_languages({f"Language {i}": 100 for i in range(7)}, "Updated today")
        root = ET.fromstring(svg)
        description = root.find("{http://www.w3.org/2000/svg}desc").text
        self.assertIn("Other 14.3%", description)
        self.assertEqual(description.count("14.3%"), 7)

    def test_empty_language_data_produces_valid_informative_card(self):
        svg = stats.render_languages({}, "Updated today")
        ET.fromstring(svg)
        self.assertIn("No public language data available.", svg)

    def test_language_names_are_escaped_in_svg(self):
        svg = stats.render_languages({"C<&>": 10}, "Updated today")
        root = ET.fromstring(svg)
        text = " ".join(root.itertext())
        self.assertIn("C<&> 100.0%", text)

    def test_api_failure_preserves_both_cached_images(self):
        with tempfile.TemporaryDirectory() as directory:
            assets = Path(directory)
            for name in ("github-stats.svg", "github-languages.svg"):
                (assets / name).write_text("existing image", encoding="utf-8")
            with patch.object(stats, "ASSETS", assets), \
                 patch.object(stats, "load_config", return_value={"username": "example"}), \
                 patch.object(stats, "collect_stats", side_effect=RuntimeError("GitHub unavailable")):
                with self.assertRaisesRegex(RuntimeError, "GitHub unavailable"):
                    stats.main()
            for image in assets.iterdir():
                self.assertEqual(image.read_text(encoding="utf-8"), "existing image")


if __name__ == "__main__":
    unittest.main()
