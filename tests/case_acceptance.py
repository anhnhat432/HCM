import os
import re
from pathlib import Path

from playwright.sync_api import Browser, BrowserContext, Page, sync_playwright


BASE_URL = os.environ.get("HCM_BASE_URL", "http://localhost:3000").rstrip("/")
PROJECT_ROOT = Path(__file__).resolve().parents[1]
CASE_DATA = (PROJECT_ROOT / "data" / "thought-cases.ts").read_text(encoding="utf-8")
CASE_SLUGS = re.findall(r'^\s+slug: "([^"]+)",', CASE_DATA, flags=re.MULTILINE)
REPRESENTATIVE_SLUGS = [CASE_SLUGS[index] for index in (0, 5, 10, 15, 20, 25)]
STAGES = [
    ("hien-tai", ""),
    ("dau-vet", "/dau-vet"),
    ("tro-lai", "/tro-lai"),
]
VIEWPORTS = [
    ("desktop-large", 1920, 1080),
    ("desktop-standard", 1366, 768),
    ("mobile", 390, 844),
    ("mobile-compact", 375, 812),
]


def stage_path(slug: str, suffix: str) -> str:
    return f"/ho-so/{slug}{suffix}"


def assert_no_horizontal_overflow(page: Page, label: str) -> None:
    has_overflow = page.evaluate(
        "document.documentElement.scrollWidth > document.documentElement.clientWidth"
    )
    assert not has_overflow, f"Horizontal overflow at {label}"


def open_page(page: Page, path: str) -> None:
    response = page.goto(f"{BASE_URL}{path}", wait_until="domcontentloaded")
    assert response and response.ok, f"Route failed: {path}"
    page.locator("h1").wait_for()


def assert_case_stage(page: Page, path: str, stage: str) -> None:
    assert page.locator("h1").count() == 1, f"Expected one h1 at {path}"
    assert page.locator(".case-stage-progress a").count() == 3, path

    current = page.locator('.case-stage-progress a[aria-current="step"]')
    assert current.count() == 1, f"Expected one current stage at {path}"
    assert current.get_attribute("href") == path, f"Wrong current stage at {path}"

    if stage == "hien-tai":
        assert page.locator(".perspective-prompt").count() in (0, 1), path
        assert page.locator(".case-evidence__reveal").count() == 0, path
        assert page.locator(".case-return__lenses").count() == 0, path
    elif stage == "dau-vet":
        assert page.locator(".case-evidence__reveal").count() == 3, path
        assert page.locator(".source-drawer-trigger").count() == 3, path
        assert page.locator(".perspective-prompt").count() == 0, path
    else:
        assert page.locator(".case-return__lenses li").count() == 3, path
        assert page.locator(".case-return__next a").count() == 2, path
        assert page.locator(".case-evidence__reveal").count() == 0, path

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
        assert page.locator(".scenario-picker__list a").count() == 3
        initial_hrefs = page.locator(".scenario-picker__list a").evaluate_all(
            "elements => elements.map(element => element.getAttribute('href'))"
        )
        page.get_by_role("button", name="Đổi tình huống").click()
        page.wait_for_function(
            "initial => document.querySelector('.scenario-picker__list a')?.getAttribute('href') !== initial[0]",
            arg=initial_hrefs,
        )
        assert page.locator(".scenario-picker__list a").count() == 3
        assert (
            page.get_by_role(
                "button", name="Chia sẻ trang Đuốc Hồng bằng mã QR"
            ).count()
            == 1
        )
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


def verify_all_static_case_stages(browser: Browser) -> None:
    assert len(CASE_SLUGS) == 30, f"Expected 30 slugs, found {len(CASE_SLUGS)}"
    errors: list[str] = []
    context = browser.new_context(viewport={"width": 1366, "height": 768})
    page = make_page(context, errors)

    for slug in CASE_SLUGS:
        for stage, suffix in STAGES:
            path = stage_path(slug, suffix)
            open_page(page, path)
            assert_case_stage(page, path, stage)

    assert_no_console_errors(errors, "all 90 static case stages")
    context.close()


def verify_representative_mobile_stages(browser: Browser) -> None:
    errors: list[str] = []
    context = browser.new_context(viewport={"width": 390, "height": 844})
    page = make_page(context, errors)

    for slug in REPRESENTATIVE_SLUGS:
        for stage, suffix in STAGES:
            path = stage_path(slug, suffix)
            open_page(page, path)
            assert_case_stage(page, path, stage)

    assert_no_console_errors(errors, "representative mobile stages")
    context.close()


def verify_route_transition_flow(browser: Browser) -> None:
    errors: list[str] = []
    context = browser.new_context(viewport={"width": 1366, "height": 768})
    page = make_page(context, errors)
    slug = CASE_SLUGS[0]

    open_page(page, "/")
    page.get_by_role("link", name="Mở một hồ sơ", exact=True).click()
    page.wait_for_url(f"{BASE_URL}/ho-so")

    first_case = page.locator(".case-library__item a").first
    first_case.click()
    page.wait_for_url(f"{BASE_URL}/ho-so/{slug}")
    assert_case_stage(page, stage_path(slug, ""), "hien-tai")

    page.get_by_role("link", name="Mở ba dấu vết", exact=True).first.click()
    evidence_path = stage_path(slug, "/dau-vet")
    page.wait_for_url(f"{BASE_URL}{evidence_path}")
    assert_case_stage(page, evidence_path, "dau-vet")
    assert (
        page.get_by_role("link", name="Quay lại vấn đề", exact=True).get_attribute(
            "href"
        )
        == stage_path(slug, "")
    )

    page.get_by_role("link", name="Kết nối và trở lại", exact=True).click()
    return_path = stage_path(slug, "/tro-lai")
    page.wait_for_url(f"{BASE_URL}{return_path}")
    assert_case_stage(page, return_path, "tro-lai")
    assert (
        page.get_by_role("link", name="Xem lại dấu vết", exact=True).get_attribute(
            "href"
        )
        == evidence_path
    )

    page.go_back(wait_until="domcontentloaded")
    page.wait_for_url(f"{BASE_URL}{evidence_path}")
    assert_case_stage(page, evidence_path, "dau-vet")
    page.get_by_role("link", name="Kết nối và trở lại", exact=True).click()
    page.wait_for_url(f"{BASE_URL}{return_path}")

    related_href = page.locator(".case-return__next a").first.get_attribute("href")
    assert related_href and related_href.startswith("/ho-so/")
    page.locator(".case-return__next a").first.click()
    page.wait_for_url(f"{BASE_URL}{related_href}")
    assert_case_stage(page, related_href, "hien-tai")

    assert_no_console_errors(errors, "three-stage transition flow")
    context.close()


def verify_stage_interactions(browser: Browser) -> None:
    errors: list[str] = []
    context = browser.new_context(viewport={"width": 1366, "height": 768})
    page = make_page(context, errors)
    slug = CASE_SLUGS[0]

    present_path = stage_path(slug, "")
    open_page(page, present_path)
    first_choice = page.locator(".perspective-prompt__choices button").first
    first_choice.click()
    assert first_choice.get_attribute("aria-pressed") == "true"
    page.locator(".perspective-prompt__status").filter(
        has_text="Bạn đang nhìn tình huống từ góc"
    ).wait_for()
    page.get_by_role("button", name="Bỏ lựa chọn", exact=True).click()
    assert first_choice.get_attribute("aria-pressed") == "false"

    evidence_path = stage_path(slug, "/dau-vet")
    open_page(page, evidence_path)
    trigger = page.locator(".source-drawer-trigger").first
    trigger.click()
    drawer = page.get_by_role("dialog")
    assert drawer.is_visible()
    assert drawer.get_by_role("heading", name="Nguồn nội dung").count() == 1
    page.get_by_role("button", name="Đóng nguồn và kiểm chứng").click()
    assert not drawer.is_visible()
    trigger_handle = trigger.element_handle()
    assert trigger_handle is not None
    page.wait_for_function(
        "element => element === document.activeElement",
        arg=trigger_handle,
    )
    assert trigger.evaluate("element => element === document.activeElement")

    return_path = stage_path(slug, "/tro-lai")
    open_page(page, return_path)
    assert page.locator(".case-return__next a").count() == 2
    trace_link = page.get_by_role("link", name="Đọc Trace đầy đủ")
    assert trace_link.get_attribute("href") == "/trace/dai-doan-ket"

    open_page(page, present_path)
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

    assert_no_console_errors(errors, "stage interactions")
    context.close()


def verify_accessibility_modes(browser: Browser) -> None:
    slug = CASE_SLUGS[0]

    reduced_errors: list[str] = []
    reduced_context = browser.new_context(
        viewport={"width": 390, "height": 844}, reduced_motion="reduce"
    )
    reduced_page = make_page(reduced_context, reduced_errors)
    for stage, suffix in STAGES:
        path = stage_path(slug, suffix)
        open_page(reduced_page, path)
        assert_case_stage(reduced_page, path, stage)
    assert_no_console_errors(reduced_errors, "reduced motion stages")
    reduced_context.close()

    forced_errors: list[str] = []
    forced_context = browser.new_context(viewport={"width": 640, "height": 900})
    forced_page = make_page(forced_context, forced_errors)
    forced_page.emulate_media(forced_colors="active")
    for stage, suffix in STAGES:
        path = stage_path(slug, suffix)
        open_page(forced_page, path)
        assert_case_stage(forced_page, path, stage)
    assert_no_console_errors(forced_errors, "forced colors stages")
    forced_context.close()

    no_script_context = browser.new_context(
        viewport={"width": 390, "height": 844}, java_script_enabled=False
    )
    no_script_page = no_script_context.new_page()

    present_path = stage_path(slug, "")
    open_page(no_script_page, present_path)
    assert_case_stage(no_script_page, present_path, "hien-tai")
    assert (
        no_script_page.get_by_role("link", name="Mở ba dấu vết", exact=True).count()
        >= 1
    )

    evidence_path = stage_path(slug, "/dau-vet")
    open_page(no_script_page, evidence_path)
    assert_case_stage(no_script_page, evidence_path, "dau-vet")
    assert no_script_page.locator(".case-evidence__no-script-sources").count() == 3
    assert no_script_page.locator(".case-evidence__no-script-sources a").count() >= 3

    return_path = stage_path(slug, "/tro-lai")
    open_page(no_script_page, return_path)
    assert_case_stage(no_script_page, return_path, "tro-lai")
    assert no_script_page.locator(".case-return__next a").count() == 2
    no_script_context.close()


def main() -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        verify_homepage_and_library(browser)
        verify_all_static_case_stages(browser)
        verify_representative_mobile_stages(browser)
        verify_route_transition_flow(browser)
        verify_stage_interactions(browser)
        verify_accessibility_modes(browser)
        browser.close()

    print(
        "Case acceptance passed: 90 stage routes, 4 library viewports, "
        "18 mobile category-stage samples, route transitions, interactions, "
        "reduced motion, forced colors, and no-JavaScript fallback."
    )


if __name__ == "__main__":
    main()
