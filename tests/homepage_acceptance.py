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
    ("Đại đoàn kết", "ĐẠI ĐOÀN KẾT", "/trace/dai-doan-ket"),
    (
        "Đạo đức & trách nhiệm",
        "ĐẠO ĐỨC & TRÁCH NHIỆM",
        "/trace/dao-duc-trach-nhiem",
    ),
    ("Con người", "CON NGƯỜI", "/trace/con-nguoi"),
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
    heading_text = " ".join(heading.inner_text().split())
    assert "Một vấn đề hôm nay." in heading_text
    assert "Một tư tưởng từ quá khứ." in heading_text
    assert page.locator(".home-hero__title-line").count() == 4

    heading_font = heading.evaluate(
        "element => getComputedStyle(element).fontFamily"
    )
    assert "Be Vietnam Pro" in heading_font
    heading_size = heading.evaluate(
        "element => parseFloat(getComputedStyle(element).fontSize)"
    )
    heading_weight = heading.evaluate(
        "element => parseInt(getComputedStyle(element).fontWeight, 10)"
    )
    assert heading_weight == 600
    viewport_width = page.evaluate("window.innerWidth")
    if viewport_width >= 1024:
        assert 84 <= heading_size <= 92
    elif viewport_width <= 480:
        assert 48 <= heading_size <= 56

    page.get_by_text("HCM // TRACE — 2026", exact=True).wait_for()
    assert page.get_by_text("03 chủ đề · 05–10 phút", exact=True).count() == 0
    assert page.get_by_text("DESIGN SYSTEM", exact=True).count() == 0

    primary_action = page.get_by_role(
        "link", name="Bắt đầu hành trình", exact=True
    )
    assert primary_action.get_attribute("href") == "/trace/dai-doan-ket"
    cta_style = primary_action.evaluate(
        """element => ({
            backgroundColor: getComputedStyle(element).backgroundColor,
            borderBottomWidth: getComputedStyle(element).borderBottomWidth,
        })"""
    )
    assert cta_style["backgroundColor"] == "rgba(0, 0, 0, 0)"
    assert float(cta_style["borderBottomWidth"].removesuffix("px")) >= 1

    hero_image = page.get_by_role(
        "img", name="Kho lưu trữ lịch sử và tài liệu", exact=True
    )
    hero_image.wait_for()
    image_box = hero_image.bounding_box()
    assert image_box is not None
    assert 0.68 <= image_box["width"] / image_box["height"] <= 0.82
    assert page.locator(".trace-visual").count() == 0

    page.get_by_text("Bạn muốn khám phá điều gì?", exact=True).wait_for()

    visible_topic_titles = page.locator(".topic-link__title").all_inner_texts()
    assert visible_topic_titles == [visible for _, visible, _ in TOPICS]

    for title, _, href in TOPICS:
        topic_link = page.get_by_role("link", name=title, exact=True)
        assert topic_link.get_attribute("href") == href

    page.get_by_text("HCM // TRACE — Prototype 2026", exact=True).wait_for()


def verify_trace_routes(page: Page) -> None:
    for title, _, href in TOPICS:
        response = page.goto(
            f"{BASE_URL}{href}", wait_until="domcontentloaded", timeout=60_000
        )
        assert response is not None and response.ok
        try:
            page.wait_for_load_state("networkidle", timeout=10_000)
        except PlaywrightTimeoutError:
            pass
        heading = page.get_by_role("heading", level=1).inner_text()
        if href == "/trace/dai-doan-ket":
            assert "Khi khác biệt" in heading
        else:
            assert heading == title


def prepare_full_page_screenshot(page: Page) -> None:
    page.wait_for_timeout(900)
    for fraction in (0.25, 0.5, 0.75, 1):
        page.evaluate(
            "fraction => window.scrollTo(0, document.body.scrollHeight * fraction)",
            fraction,
        )
        page.wait_for_timeout(250)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(600)


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
        mobile_body_font = mobile.locator(".home-hero__supporting").evaluate(
            "element => parseFloat(getComputedStyle(element).fontSize)"
        )
        assert mobile_body_font >= 16

        for locator in [
            mobile.get_by_role("link", name="Bắt đầu hành trình", exact=True),
            *[
                mobile.get_by_role("link", name=title, exact=True)
                for title, _, _ in TOPICS
            ],
        ]:
            box = locator.bounding_box()
            assert box is not None and box["height"] >= 44

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
