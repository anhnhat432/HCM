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
    os.environ.get("HCM_SCREENSHOT_DIR", "artifacts/homepage")
).resolve()

TOPICS = [
    ("Đại đoàn kết", "/trace/dai-doan-ket"),
    ("Đạo đức & trách nhiệm", "/trace/dao-duc-trach-nhiem"),
    ("Con người", "/trace/con-nguoi"),
]


def collect_console_errors(page: Page) -> list[str]:
    errors: list[str] = []

    def on_console(message: ConsoleMessage) -> None:
        if message.type == "error" or "hydrated but" in message.text:
            errors.append(message.text)

    page.on("console", on_console)
    page.on("pageerror", lambda error: errors.append(str(error)))
    return errors


def verify_homepage(page: Page) -> None:
    response = page.goto(BASE_URL, wait_until="domcontentloaded", timeout=60_000)
    assert response is not None and response.ok
    try:
        page.wait_for_load_state("networkidle", timeout=10_000)
    except PlaywrightTimeoutError:
        pass

    heading = page.get_by_role("heading", level=1)
    assert heading.count() == 1
    heading_text = heading.inner_text()
    assert "Một vấn đề hôm nay." in heading_text
    assert "Một tư tưởng từ quá khứ." in heading_text

    primary_action = page.get_by_role(
        "link", name="Bắt đầu hành trình", exact=True
    )
    assert primary_action.get_attribute("href") == "/trace/dai-doan-ket"

    page.get_by_role(
        "heading", name="Bạn muốn khám phá điều gì?", exact=True
    ).wait_for()

    for title, href in TOPICS:
        topic_link = page.get_by_role("link", name=title, exact=True)
        assert topic_link.get_attribute("href") == href


def verify_trace_routes(page: Page) -> None:
    for title, href in TOPICS:
        response = page.goto(
            f"{BASE_URL}{href}", wait_until="domcontentloaded", timeout=60_000
        )
        assert response is not None and response.ok
        try:
            page.wait_for_load_state("networkidle", timeout=10_000)
        except PlaywrightTimeoutError:
            pass
        assert page.get_by_role("heading", level=1).inner_text() == title


def prepare_full_page_screenshot(page: Page) -> None:
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(900)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(900)


def main() -> None:
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        desktop = browser.new_page(viewport={"width": 1920, "height": 1080})
        desktop_errors = collect_console_errors(desktop)
        verify_homepage(desktop)
        prepare_full_page_screenshot(desktop)
        desktop.screenshot(
            path=str(SCREENSHOT_DIR / "homepage-desktop.png"),
            full_page=True,
        )
        verify_trace_routes(desktop)

        laptop = browser.new_page(viewport={"width": 1366, "height": 768})
        laptop_errors = collect_console_errors(laptop)
        verify_homepage(laptop)
        laptop_viewport_width, laptop_document_width = laptop.evaluate(
            "[document.documentElement.clientWidth, document.documentElement.scrollWidth]"
        )
        assert laptop_document_width <= laptop_viewport_width
        prepare_full_page_screenshot(laptop)
        laptop.screenshot(
            path=str(SCREENSHOT_DIR / "homepage-laptop.png"),
            full_page=True,
        )

        mobile = browser.new_page(viewport={"width": 390, "height": 844})
        mobile_errors = collect_console_errors(mobile)
        verify_homepage(mobile)
        viewport_width, document_width = mobile.evaluate(
            "[document.documentElement.clientWidth, document.documentElement.scrollWidth]"
        )
        assert document_width <= viewport_width
        prepare_full_page_screenshot(mobile)
        mobile.screenshot(
            path=str(SCREENSHOT_DIR / "homepage-mobile.png"),
            full_page=True,
        )

        reduced_motion = browser.new_page(
            viewport={"width": 390, "height": 844}, reduced_motion="reduce"
        )
        reduced_motion_errors = collect_console_errors(reduced_motion)
        verify_homepage(reduced_motion)

        browser.close()

    errors = desktop_errors + laptop_errors + mobile_errors + reduced_motion_errors
    assert not errors, f"Browser console errors: {errors}"
    print("Homepage acceptance passed")


if __name__ == "__main__":
    main()
