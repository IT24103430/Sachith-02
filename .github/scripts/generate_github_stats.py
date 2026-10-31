#!/usr/bin/env python3
"""Cache public GitHub statistics as SVGs, independent of image hosting services."""

from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import html
from pathlib import Path

from update_profile import LANGUAGE_COLORS, api_get, fetch_languages, fetch_repositories, load_config


ASSETS = Path(__file__).resolve().parents[2] / "assets"


def collect_stats(username):
    profile = api_get(f"/users/{username}")
    repositories = fetch_repositories(username)
    # Forks can contain upstream stars and code, so exclude them from these totals.
    originals = [repo for repo in repositories if not repo["fork"] and not repo["private"]]
    languages = Counter()
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = pool.map(lambda repo: fetch_languages(username, repo["name"]), originals)
        for result in results:
            languages.update(result)
    return {
        "repositories": profile["public_repos"],
        "stars": sum(repo["stargazers_count"] for repo in originals),
        "forks": sum(repo["forks_count"] for repo in originals),
        "followers": profile["followers"],
        "languages": dict(languages),
    }


def card(title, description, content, updated):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="500" height="210" viewBox="0 0 500 210" role="img" aria-labelledby="title desc">
  <title id="title">{html.escape(title)}</title>
  <desc id="desc">{html.escape(description)}</desc>
  <style>text{{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif}} .label{{fill:#38bdae;font-size:14px}} .value{{fill:#c0caf5;font-size:26px;font-weight:700}}</style>
  <rect width="500" height="210" rx="12" fill="#1a1b27"/>
  <text x="24" y="35" fill="#70a5fd" font-size="21" font-weight="700">{html.escape(title)}</text>
{content}
  <text x="24" y="191" fill="#9aa5ce" font-size="10">{html.escape(updated)}</text>
</svg>
'''


def render_stats(stats, updated):
    labels = (("Public repositories", "repositories"), ("Stars earned", "stars"),
              ("Repository forks", "forks"), ("Followers", "followers"))
    nodes = []
    for index, (label, key) in enumerate(labels):
        x = 24 + (index % 2) * 242
        y = 74 + (index // 2) * 58
        nodes.append(f'  <text x="{x}" y="{y}" class="value">{stats[key]:,}</text>')
        nodes.append(f'  <text x="{x}" y="{y + 21}" class="label">{label}</text>')
    nodes.append('  <path d="M246 54V159" stroke="#30364b"/>')
    description = "; ".join(f"{label}: {stats[key]}" for label, key in labels)
    return card("GitHub Stats", description, "\n".join(nodes), updated)


def render_languages(languages, updated):
    ordered = sorted(((name, size) for name, size in languages.items() if size > 0),
                     key=lambda item: item[1], reverse=True)
    total = sum(size for _, size in ordered)
    selected = ordered[:6]
    if not total:
        return card("Most Used Languages", "No public language data available.",
                    '  <text x="24" y="94" class="label">No public language data available.</text>', updated)
    nodes = ['  <text x="24" y="56" fill="#9aa5ce" font-size="11">By code bytes · public, non-fork repositories</text>']
    x = 24.0
    for index, (name, size) in enumerate(selected):
        width = 452 * size / total
        color = "#" + LANGUAGE_COLORS.get(name, "a371f7")
        nodes.append(f'  <rect x="{x:.2f}" y="70" width="{width:.2f}" height="10" fill="{color}"/>')
        x += width
        column = 24 + (index % 2) * 242
        row = 106 + (index // 2) * 27
        nodes.append(f'  <circle cx="{column + 5}" cy="{row - 4}" r="5" fill="{color}"/>')
        nodes.append(f'  <text x="{column + 17}" y="{row}" class="label">{html.escape(name)} {size / total:.1%}</text>')
    remaining = sum(size for _, size in ordered[6:])
    if remaining:
        nodes.append(f'  <rect x="{x:.2f}" y="70" width="{452 * remaining / total:.2f}" height="10" fill="#555b70"/>')
    description = "Language shares by code bytes: " + "; ".join(f"{name} {size / total:.1%}" for name, size in selected)
    if remaining:
        description += f"; Other {remaining / total:.1%}"
    return card("Most Used Languages", description, "\n".join(nodes), updated)


def main():
    stats = collect_stats(load_config()["username"])
    updated = datetime.now(timezone.utc).strftime("Public GitHub data · Updated %Y-%m-%d %H:%M UTC")
    # Fetch and render everything before writing; API failures leave the cached cards intact.
    outputs = {
        "github-stats.svg": render_stats(stats, updated),
        "github-languages.svg": render_languages(stats["languages"], updated),
    }
    ASSETS.mkdir(exist_ok=True)
    for filename, content in outputs.items():
        (ASSETS / filename).write_text(content, encoding="utf-8")
        print(f"Generated assets/{filename}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
