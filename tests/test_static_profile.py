import contextlib
import importlib.util
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch


SCRIPTS = Path(__file__).resolve().parents[1] / ".github" / "scripts"


def load_script(name):
    spec = importlib.util.spec_from_file_location(f"static_profile_{name}", SCRIPTS / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


updater = load_script("update_profile")
lint = load_script("readme_lint")
health = load_script("profile_health_check")

README = """# Student Profile

## About Me
Computer Science undergraduate.

## Technical Stack
Developing practical programming skills.

## Featured Engineering Projects
Selected coursework and applications.

## Engineering Interests
Backend and full-stack software.

## Currently Learning
Algorithms and testing.

## Let’s Connect
Seeking an internship.
"""


class StaticProfileTests(unittest.TestCase):
    def run_lint(self, text, mode="static"):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            readme = root / "README.md"
            config = root / "profile.config.json"
            readme.write_text(text, encoding="utf-8")
            config.write_text(json.dumps({"readme_mode": mode}), encoding="utf-8")
            with patch.object(lint, "README", readme), patch.object(lint, "CONFIG", config):
                with contextlib.redirect_stdout(io.StringIO()):
                    return lint.main()

    def test_static_updater_keeps_readme_and_makes_no_api_requests(self):
        with tempfile.TemporaryDirectory() as directory:
            readme = Path(directory) / "README.md"
            readme.write_text(README, encoding="utf-8")
            with patch.object(updater, "load_config", return_value={"readme_mode": "static"}):
                with patch.object(updater, "README_PATH", readme), patch.object(updater, "api_get") as api:
                    with contextlib.redirect_stdout(io.StringIO()):
                        self.assertEqual(updater.main(), 0)
                    api.assert_not_called()
                    self.assertEqual(readme.read_text(encoding="utf-8"), README)

    def test_concise_static_readme_passes_without_generated_markers(self):
        self.assertEqual(self.run_lint(README), 0)

    def test_static_readme_requires_its_sections(self):
        self.assertEqual(self.run_lint(README.replace("## Technical Stack", "## Tools")), 1)

    def test_static_readme_still_rejects_duplicate_headings(self):
        self.assertEqual(self.run_lint(README + "\n## About Me\nDuplicate.\n"), 1)

    def test_dynamic_lint_still_requires_generated_layout(self):
        self.assertEqual(self.run_lint(README, mode="dynamic"), 1)

    def test_static_health_requires_sections(self):
        self.assertTrue(all(ok for _, ok, _ in health.check_readme(README, {"readme_mode": "static"})))
        missing = README.replace("## Featured Engineering Projects", "## Work")
        self.assertTrue(any(not ok for _, ok, _ in health.check_readme(missing, {"readme_mode": "static"})))

    def test_dynamic_health_still_requires_markers(self):
        self.assertTrue(any(not ok for _, ok, _ in health.check_readme(README, {})))


if __name__ == "__main__":
    unittest.main()
