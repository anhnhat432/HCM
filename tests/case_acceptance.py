import os
import re
from pathlib import Path

from playwright.sync_api import Browser, BrowserContext, Page, sync_playwright


BASE_URL = os.environ.get("HCM_BASE_URL", "http://localhost:3000").rstrip("/")
PROJECT_ROOT = Path(__file__).resolve().parents[1]
CASE_DATA = (PROJECT_ROOT / "data" / "thought-cases.ts").read_text(encoding="utf-8")
CASE_SLUGS = re.findall(r'^\s+slug: "([^"]+)",', CASE_DATA, flags=re.MULTILINE)
REPRESENTATIVE_SLUGS = [CASE_SLUGS[index] for index in (0, 5, 10, 15, 20, 25)]
VIEWPORTS = [
    ("desktop-large", 1920, 1080),
    ("desktop-standard", 1366, 768),
    ("mobile", 390, 844),
    ("mobile-compact", 375, 812),
]
ACT_IDS = [
    "case-present",
    "case-assumption",
    "case-file",
    "case-evidence",
    "case-connection",
    "case-return",
]


def assert_no_horizontal_overflow(page: Page, label: str) -> None:
    has_overflow = page.evaluate(
        "document.documentElement.scrollWidth > document.documentElement.clientWidth"
    )
    assert not has_overflow, f"Horizontal overflow at {label}"


def open_page(page: Page, path: str) -> None:
    response = page.goto(f"{BASE_URL}{path}", wait_until="domcontentloaded")
    assert response and response.ok, f"Route failed: {path}"
    page.locator("h1").wait_for()


def assert_case_shell(page: Page, path: str) -> None:
    assert page.locator("h1").count() == 1, f"Expected one h1 at {path}"
    assert page.locator(".case-evidence__reveal").count() == 3, path
    assert page.locator(".case-progress a").count() == 6, path
    for act_id in ACT_IDS:
        assert page.locator(f"#{act_id}").count() == 1, f"Missing {act_id} at {path}"
    assert_no_horizontal_overflow(page, path)


def assert_no_console_errors(errors: list[str], label: str) -> None:
    assert not errors, f"Console errors at {label}: {errors}"


def make_page(context: BrowserContext, errors: list[str]) -> Page:
    page = context.new_page()
    page.on(
        "console",
        lambda message: errors.append(message.text) if message.type == "error" else None,
    )
    page.on("pageerror", lambda error: errors.append(str(error)))
    return page


def verify_homepage_and_library(browser: Browser) -> None:
    for label, width, height in VIEWPORTS:
        errors: list[str] = []
        context = browser.new_context(viewport={"width": width, "height": height})
        page = make_page(context, errors)

        open_page(page, "/")
        assert page.locator('.scenario-picker__list a').count() == 3
        initial_hrefs = page.locator('.scenario-picker__list a').evaluate_all(
            "elements => elements.map(element => element.getAttribute('href'))"
        )
        page.get_by_role("button", name="Đổi tình huống").click()
        page.wait_for_function(
            "initial => document.querySelector('.scenario-picker__list a')?.getAttribute('href') !== initial[0]",
            arg=initial_hrefs,
        )
        assert page.locator('.scenario-picker__list a').count() == 3
        assert page.get_by_role("button", name="Chia sẻ trang Đuốc Hồng bằng mã QR").count() == 1
        assert_no_horizontal_overflow(page, f"Homepage {label}")

        open_page(page, "/ho-so")
        assert page.locator(".case-library__item").count() == 30
        assert page.get_by_label("Lọc hồ sơ theo chủ đề").count() == 1
        assert page.get_by_label("Tìm tình huống").count() == 1
        assert_no_horizontal_overflow(page, f"Library {label}")

        if label == "desktop-standard":
            page.get_by_role("button", name="Mạng xã hội", exact=True).click()
            assert page.locator(".case-library__item").count() == 5
            page.get_by_role("button", name="Tất cả", exact=True).click()
            page.get_by_label("Tìm tình huống").fill("điểm số")
            assert page.locator(".case-library__item").count() >= 1

        assert_no_console_errors(errors, f"Homepage/library {label}")
        context.close()


def verify_all_static_cases(browser: Browser) -> None:
    assert len(CASE_SLUGS) == 30, f"Expected 30 slugs, found {len(CASE_SLUGS)}"
    errors: list[str] = []
    context = browser.new_context(viewport={"width": 1366, "height": 768})
    page = make_page(context, errors)

    for slug in CASE_SLUGS:
        path = f"/ho-so/{slug}"
        open_page(page, path)
        assert_case_shell(page, path)

    assert_no_console_errors(errors, "all static cases")
    context.close()


def verify_representative_mobile_cases(browser: Browser) -> None:
    errors: list[str] = []
    context = browser.new_context(viewport={"width": 390, "height": 844})
    page = make_page(context, errors)

    for slug in REPRESENTATIVE_SLUGS:
        path = f"/ho-so/{slug}"
        open_page(page, path)
        assert_case_shell(page, path)

    assert_no_console_errors(errors, "representative mobile cases")
    context.close()


def verify_case_interactions(browser: Browser) -> None:
    errors: list[str] = []
    context = browser.new_context(viewport={"width": 1366, "height": 768})
    page = make_page(context, errors)
    open_page(page, f"/ho-so/{CASE_SLUGS[0]}")

    first_choice = page.locator(".perspective-prompt__choices button").first
    first_choice.click()
    assert first_choice.get_attribute("aria-pressed") == "true"
    assert "Bạn đang nhìn tình huống từ góc" in page.locator(
        ".perspective-prompt__status"
    ).inner_text()

    for act_id in ACT_IDS:
        progress_link = page.locator(f'.case-progress a[href="#{act_id}"]')
        progress_link.click()
        page.wait_for_function(
            "id => document.querySelector(`.case-progress a[href='#${id}']`)?.getAttribute('aria-current') === 'step'",
            arg=act_id,
        )
        assert progress_link.get_attribute("aria-current") == "step"

    page.locator(".case-evidence__reveal").first.locator(
        ".source-drawer-trigger"
    ).click()
    drawer = page.get_by_role("dialog")
    assert drawer.is_visible()
    assert drawer.get_by_role("heading", name="Nguồn nội dung").count() == 1
    page.get_by_role("button", name="Đóng nguồn và kiểm chứng").click()
    assert not drawer.is_visible()

    assert page.locator('.case-return__next a').count() == 2
    trace_link = page.get_by_role("link", name="Đọc Trace đầy đủ")
    assert trace_link.get_attribute("href") == "/trace/dai-doan-ket"

    open_page(page, f"/ho-so/{CASE_SLUGS[0]}")
    page.keyboard.press("Tab")
    active_element = page.evaluate(
        """() => ({
            tag: document.activeElement?.tagName,
            className: document.activeElement?.className,
            href: document.activeElement?.getAttribute?.('href'),
            text: document.activeElement?.textContent?.trim(),
        })"""
    )
    assert active_element["className"] == "skip-link", active_element

    assert_no_console_errors(errors, "case interactions")
    context.close()


def verify_accessibility_modes(browser: Browser) -> None:
    path = f"/ho-so/{CASE_SLUGS[0]}"

    reduced_context = browser.new_context(
        viewport={"width": 390, "height": 844}, reduced_motion="reduce"
    )
    reduced_page = reduced_context.new_page()
    open_page(reduced_page, path)
    assert_case_shell(reduced_page, path)
    reduced_context.close()

    forced_context = browser.new_context(viewport={"width": 640, "height": 900})
    forced_page = forced_context.new_page()
    forced_page.emulate_media(forced_colors="active")
    open_page(forced_page, path)
    assert_case_shell(forced_page, path)
    forced_page.locator('.case-progress a[href="#case-file"]').click()
    forced_page.wait_for_function(
        "document.querySelector('.case-progress a[href=\"#case-file\"]')?.getAttribute('aria-current') === 'step'"
    )
    forced_context.close()

    no_script_context = browser.new_context(
        viewport={"width": 390, "height": 844}, java_script_enabled=False
    )
    no_script_page = no_script_context.new_page()
    open_page(no_script_page, path)
    assert no_script_page.locator(".case-evidence__reveal").count() == 3
    assert no_script_page.locator(".case-evidence__no-script-sources").count() == 3
    assert no_script_page.locator(".case-evidence__no-script-sources a").count() >= 3
    assert no_script_page.locator(".perspective-prompt__choices button").count() == 2
    assert_no_horizontal_overflow(no_script_page, "no-JavaScript case")
    no_script_context.close()


def main() -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        verify_homepage_and_library(browser)
        verify_all_static_cases(browser)
        verify_representative_mobile_cases(browser)
        verify_case_interactions(browser)
        verify_accessibility_modes(browser)
        browser.close()

    print(
        "Case acceptance passed: 30 routes, 4 library viewports, 6 mobile category samples, "
        "interactions, reduced motion, forced colors, and no-JavaScript fallback."
    )


if __name__ == "__main__":
    main()
