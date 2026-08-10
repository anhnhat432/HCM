import os
from pathlib import Path

from playwright.sync_api import (
    ConsoleMessage,
    Page,
    TimeoutError as PlaywrightTimeoutError,
    sync_playwright,
)


BASE_URL = os.environ.get("HCM_BASE_URL", "http://localhost:3000")
SCREENSHOT_DIR = Path(
    os.environ.get("HCM_TRACE_SCREENSHOT_DIR", "artifacts/trace-01")
).resolve()
TRACE_PATH = "/trace/dai-doan-ket"

EXPECTED_STAGES = [
    "present-day",
    "trace-back",
    "1930",
    "1941",
    "1945",
    "thought-formation",
    "return-2026",
    "application",
    "next-trace",
]


def collect_console_errors(page: Page) -> list[str]:
    errors: list[str] = []

    def on_console(message: ConsoleMessage) -> None:
        if message.type == "error" or "hydrated but" in message.text:
            errors.append(message.text)

    page.on("console", on_console)
    page.on("pageerror", lambda error: errors.append(str(error)))
    return errors


def settle_page(page: Page) -> None:
    try:
        page.wait_for_load_state("networkidle", timeout=10_000)
    except PlaywrightTimeoutError:
        pass
    page.evaluate("() => document.fonts.ready")


def rendered_line_count(page: Page, selector: str) -> list[int]:
    return page.locator(selector).evaluate_all(
        """elements => elements.map(element => {
            const style = getComputedStyle(element);
            const lineHeight = Number.parseFloat(style.lineHeight);
            return Math.ceil(element.getBoundingClientRect().height / lineHeight);
        })"""
    )


def verify_trace(page: Page) -> None:
    response = page.goto(
        f"{BASE_URL}{TRACE_PATH}", wait_until="domcontentloaded", timeout=60_000
    )
    assert response is not None and response.ok
    settle_page(page)
    assert page.title() == "ĐUỐC HỒNG"

    headings = page.get_by_role("heading", level=1)
    assert headings.count() == 1
    assert "Khi khác biệt" in headings.inner_text()

    header = page.locator(".trace-header")
    header.wait_for()
    assert header.evaluate("element => getComputedStyle(element).position") == "sticky"
    assert header.get_by_role("link", name="ĐUỐC HỒNG").get_attribute("href") == "/"
    assert page.get_by_text("HCM // TRACE", exact=False).count() == 0
    header_title = header.get_by_text("Đại đoàn kết", exact=True)
    assert header_title.count() == 1
    if page.evaluate("window.innerWidth") > 768:
        header_title.wait_for()
    header.get_by_text("01 / 03", exact=True).wait_for()

    stages = page.locator("[data-trace-stage]").evaluate_all(
        "elements => elements.map(element => element.dataset.traceStage)"
    )
    assert stages == EXPECTED_STAGES

    question = page.locator(".trace-opening__question")
    question.wait_for()
    assert "Điều gì có thể giữ một tập thể cùng hướng?" in question.inner_text()
    years = page.locator(".historical-moment__year").all_inner_texts()
    assert years == ["1930", "1941", "1945"]

    viewport_width = page.evaluate("window.innerWidth")
    if viewport_width >= 1024:
        thought_heading_size = page.locator(".thought-formation__heading").evaluate(
            "element => Number.parseFloat(getComputedStyle(element).fontSize)"
        )
        factor_padding = page.locator(".formation-factor").first.evaluate(
            "element => Number.parseFloat(getComputedStyle(element).paddingTop)"
        )
        convergence_width = page.locator(".thought-formation__line span").evaluate(
            "element => Number.parseFloat(getComputedStyle(element).width)"
        )
        conclusion_size = page.locator(
            ".thought-formation__conclusion h3"
        ).evaluate(
            "element => Number.parseFloat(getComputedStyle(element).fontSize)"
        )
        application_content = page.locator(
            ".present-application__content"
        ).bounding_box()
        application_anchor = page.locator(
            ".present-application__anchor"
        ).bounding_box()

        assert 52 <= thought_heading_size <= 56
        assert factor_padding >= 28
        assert convergence_width >= 2
        assert conclusion_size >= 72
        assert application_content is not None and application_anchor is not None
        assert application_anchor["x"] - application_content["x"] <= 780
    elif viewport_width <= 480:
        application_item = page.locator(".application-item").first
        application_body = application_item.locator("p")
        application_font_size = application_body.evaluate(
            "element => Number.parseFloat(getComputedStyle(element).fontSize)"
        )
        application_gap = application_item.evaluate(
            "element => Number.parseFloat(getComputedStyle(element).columnGap)"
        )

        assert all(
            lines <= 5
            for lines in rendered_line_count(page, ".historical-moment__summary")
        )
        assert application_font_size <= 14.8
        assert application_gap <= 6.5
        assert all(
            lines <= 3 for lines in rendered_line_count(page, ".application-item p")
        )

    assert page.get_by_role(
        "link", name="Đạo đức & trách nhiệm", exact=True
    ).get_attribute("href") == "/trace/dao-duc-trach-nhiem"
    assert page.get_by_role("link", name="Về trang chủ", exact=True).get_attribute(
        "href"
    ) == "/"

    viewport_width, document_width = page.evaluate(
        "[document.documentElement.clientWidth, document.documentElement.scrollWidth]"
    )
    assert document_width <= viewport_width


def verify_mobile_targets(page: Page) -> None:
    for name in [
        "ĐUỐC HỒNG",
        "Nhìn lại quá khứ",
        "Xem cách áp dụng",
        "Đạo đức & trách nhiệm",
        "Về trang chủ",
    ]:
        target = page.get_by_role("link", name=name, exact=True)
        box = target.bounding_box()
        assert box is not None and box["height"] >= 44


def prepare_full_page_screenshot(page: Page) -> None:
    page.wait_for_timeout(500)
    for step in range(1, 17):
        page.evaluate(
            "fraction => window.scrollTo(0, document.body.scrollHeight * fraction)",
            step / 16,
        )
        page.wait_for_timeout(180)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)


def verify_incomplete_trace_stays_placeholder(page: Page) -> None:
    response = page.goto(
        f"{BASE_URL}/trace/dao-duc-trach-nhiem",
        wait_until="domcontentloaded",
        timeout=60_000,
    )
    assert response is not None and response.ok
    assert page.get_by_role("heading", level=1).inner_text() == "Đạo đức & trách nhiệm"
    assert page.get_by_role("link", name="ĐUỐC HỒNG").get_attribute("href") == "/"
    assert page.get_by_text("HCM // TRACE", exact=False).count() == 0
    assert page.locator("[data-trace-stage]").count() == 0


def main() -> None:
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        desktop = browser.new_page(viewport={"width": 1920, "height": 1080})
        desktop_errors = collect_console_errors(desktop)
        verify_trace(desktop)
        prepare_full_page_screenshot(desktop)
        desktop.screenshot(
            path=str(SCREENSHOT_DIR / "trace-01-desktop.png"), full_page=True
        )
        verify_incomplete_trace_stays_placeholder(desktop)

        laptop = browser.new_page(viewport={"width": 1366, "height": 768})
        laptop_errors = collect_console_errors(laptop)
        verify_trace(laptop)
        prepare_full_page_screenshot(laptop)
        laptop.screenshot(
            path=str(SCREENSHOT_DIR / "trace-01-laptop.png"), full_page=True
        )

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile_errors = collect_console_errors(mobile)
        verify_trace(mobile)
        verify_mobile_targets(mobile)
        prepare_full_page_screenshot(mobile)
        mobile.screenshot(
            path=str(SCREENSHOT_DIR / "trace-01-mobile.png"), full_page=True
        )

        reduced_motion = browser.new_page(
            viewport={"width": 390, "height": 844}, reduced_motion="reduce"
        )
        reduced_motion_errors = collect_console_errors(reduced_motion)
        verify_trace(reduced_motion)

        browser.close()

    errors = desktop_errors + laptop_errors + mobile_errors + reduced_motion_errors
    assert not errors, f"Browser console errors: {errors}"
    print("Trace 01 acceptance passed")


if __name__ == "__main__":
    main()
