import os
from pathlib import Path

from playwright.sync_api import (
    ConsoleMessage,
    Page,
    TimeoutError as PlaywrightTimeoutError,
    sync_playwright,
)


BASE_URL = os.environ.get("HCM_BASE_URL", "http://localhost:3000")
SITE_DESCRIPTION = (
    "Bắt đầu từ những câu hỏi của hiện tại và lần theo quá trình hình thành "
    "tư tưởng Hồ Chí Minh."
)
SCREENSHOT_DIR = Path(
    os.environ.get("HCM_SCREENSHOT_DIR", "artifacts/homepage")
).resolve()

TOPICS = [
    (
        "Đại đoàn kết",
        "ĐẠI ĐOÀN KẾT",
        "/trace/dai-doan-ket",
        "Khi khác biệt",
    ),
    (
        "Đạo đức & trách nhiệm",
        "ĐẠO ĐỨC & TRÁCH NHIỆM",
        "/trace/dao-duc-trach-nhiem",
        "Khi điều dễ làm",
    ),
    ("Con người", "CON NGƯỜI", "/trace/con-nguoi", "Khi một con người"),
]


def text_contrast_ratio(page: Page, selector: str) -> float:
    return page.locator(selector).first.evaluate(
        """element => {
            const parseColor = color => {
                if (color.startsWith('#')) {
                    const hex = color.slice(1);
                    return {
                        r: Number.parseInt(hex.slice(0, 2), 16),
                        g: Number.parseInt(hex.slice(2, 4), 16),
                        b: Number.parseInt(hex.slice(4, 6), 16),
                        a: 1,
                    };
                }
                const values = color.match(/[\\d.]+/g)?.map(Number) ?? [];
                return {
                    r: values[0] ?? 0,
                    g: values[1] ?? 0,
                    b: values[2] ?? 0,
                    a: values[3] ?? 1,
                };
            };
            const blend = (foreground, background) => ({
                r: foreground.r * foreground.a + background.r * (1 - foreground.a),
                g: foreground.g * foreground.a + background.g * (1 - foreground.a),
                b: foreground.b * foreground.a + background.b * (1 - foreground.a),
            });
            const luminance = color => {
                const channels = [color.r, color.g, color.b].map(channel => {
                    const value = channel / 255;
                    return value <= 0.04045
                        ? value / 12.92
                        : Math.pow((value + 0.055) / 1.055, 2.4);
                });
                return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
            };
            const foreground = parseColor(getComputedStyle(element).color);
            const background = parseColor(
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-canvas')
                    .trim()
            );
            const renderedForeground = blend(foreground, background);
            const foregroundLuminance = luminance(renderedForeground);
            const backgroundLuminance = luminance(background);
            return (
                (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
                (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
            );
        }"""
    )


def verify_text_contrast(page: Page) -> None:
    for selector in [
        ".home-hero__supporting",
        ".topic-section__label",
        ".topic-link__idea",
        ".home-footer p",
    ]:
        ratio = text_contrast_ratio(page, selector)
        assert ratio >= 4.5, f"{selector} contrast is only {ratio:.2f}:1"


def collect_console_errors(page: Page) -> list[str]:
    errors: list[str] = []

    def on_console(message: ConsoleMessage) -> None:
        if message.type == "error" or "hydrated but" in message.text:
            errors.append(message.text)

    page.on("console", on_console)
    page.on("pageerror", lambda error: errors.append(str(error)))
    return errors


def verify_no_horizontal_overflow(page: Page, label: str) -> None:
    viewport_width, document_width = page.evaluate(
        "[document.documentElement.clientWidth, document.documentElement.scrollWidth]"
    )
    assert document_width <= viewport_width, (
        f"{label} overflows horizontally: {document_width}px > {viewport_width}px"
    )


def verify_focus_indicator(page: Page, selector: str) -> None:
    locator = page.locator(selector).first
    page.keyboard.press("Tab")
    locator.focus()
    assert locator.evaluate("element => element === document.activeElement")
    assert locator.evaluate("element => element.matches(':focus-visible')")
    focus_style = locator.evaluate(
        """element => ({
            outlineStyle: getComputedStyle(element).outlineStyle,
            outlineWidth: Number.parseFloat(getComputedStyle(element).outlineWidth),
            boxShadow: getComputedStyle(element).boxShadow,
        })"""
    )
    has_outline = (
        focus_style["outlineStyle"] != "none" and focus_style["outlineWidth"] >= 2
    )
    assert has_outline or focus_style["boxShadow"] != "none", (
        f"{selector} has no visible keyboard focus indicator"
    )


def verify_qr_share_dialog(page: Page) -> None:
    trigger = page.get_by_role(
        "button", name="Chia sẻ trang Đuốc Hồng bằng mã QR", exact=True
    )
    trigger.click()
    dialog = page.get_by_role("dialog", name="Chia sẻ bằng mã QR")
    dialog.wait_for()
    page.wait_for_function(
        """() => document.querySelector(
            '.qr-share__code img'
        )?.getAttribute('src')?.startsWith('data:image/png')"""
    )
    assert "https://hcm-trace.vercel.app" in dialog.inner_text()
    assert page.get_by_role(
        "button", name="Đóng chia sẻ bằng mã QR"
    ).evaluate("element => element === document.activeElement")
    page.keyboard.press("Escape")
    dialog.wait_for(state="detached")
    page.wait_for_function(
        "element => element === document.activeElement", arg=trigger.element_handle()
    )


def verify_homepage(page: Page) -> None:
    response = page.goto(BASE_URL, wait_until="domcontentloaded", timeout=60_000)
    assert response is not None and response.ok
    try:
        page.wait_for_load_state("networkidle", timeout=10_000)
    except PlaywrightTimeoutError:
        pass

    assert page.title() == "Đuốc Hồng"
    assert (
        page.locator('meta[name="description"]').get_attribute("content")
        == SITE_DESCRIPTION
    )
    assert (
        page.locator('meta[property="og:site_name"]').get_attribute("content")
        == "Đuốc Hồng"
    )
    assert (
        page.locator('meta[property="og:locale"]').get_attribute("content")
        == "vi_VN"
    )
    canonical_href = page.locator('link[rel="canonical"]').get_attribute("href")
    assert canonical_href is not None
    assert canonical_href.rstrip("/") == "https://hcm-trace.vercel.app"
    assert page.locator('meta[property="og:image"]').get_attribute(
        "content"
    ).endswith("/images/homepage-independence-declaration.jpg")
    assert page.locator('meta[name="twitter:card"]').get_attribute(
        "content"
    ) == "summary_large_image"
    assert page.locator(".brand-mark").inner_text() == "ĐUỐC HỒNG"
    assert page.get_by_text("HCM // TRACE", exact=False).count() == 0

    heading = page.get_by_role("heading", level=1)
    assert heading.count() == 1
    heading_text = " ".join(heading.inner_text().split())
    heading_dom_text = heading.evaluate(
        "element => element.textContent.replace(/\\s+/g, ' ').trim()"
    )
    assert heading_dom_text == heading_text
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
    viewport_height = page.evaluate("window.innerHeight")
    if viewport_width in {1920, 390}:
        verify_qr_share_dialog(page)
    if viewport_width >= 1024:
        if viewport_height <= 820:
            assert 72 <= heading_size <= 80
        else:
            assert 84 <= heading_size <= 92
    elif viewport_width <= 480:
        assert 48 <= heading_size <= 56

    page.locator(".home-hero").get_by_text(
        "ĐUỐC HỒNG — 2026", exact=True
    ).wait_for()
    assert page.get_by_text("03 chủ đề · 05–10 phút", exact=True).count() == 0
    assert page.get_by_text("DESIGN SYSTEM", exact=True).count() == 0

    primary_action = page.get_by_role(
        "link", name="Bắt đầu với một tình huống", exact=True
    )
    assert primary_action.get_attribute("href") == "#tinh-huong-goi-y"
    assert page.get_by_text("Khoảng 2 phút", exact=False).count() >= 1
    if viewport_width >= 1024 and viewport_height <= 820:
        action_box = primary_action.bounding_box()
        assert action_box is not None
        assert action_box["y"] + action_box["height"] <= viewport_height, (
            "Homepage primary action must remain visible in the initial "
            "low-height viewport"
        )
    cta_style = primary_action.evaluate(
        """element => ({
            backgroundColor: getComputedStyle(element).backgroundColor,
            borderBottomWidth: getComputedStyle(element).borderBottomWidth,
        })"""
    )
    assert cta_style["backgroundColor"] == "rgba(0, 0, 0, 0)"
    assert float(cta_style["borderBottomWidth"].removesuffix("px")) >= 1

    hero_image = page.get_by_role(
        "img",
        name="Trang đầu bản Tuyên ngôn Độc lập với bút tích và dấu lưu trữ",
        exact=True,
    )
    hero_image.wait_for()
    assert "homepage-independence-declaration.jpg" in (
        hero_image.get_attribute("src") or ""
    )
    hero_image_style = hero_image.evaluate(
        """element => ({
            objectFit: getComputedStyle(element).objectFit,
            opacity: getComputedStyle(element).opacity,
            mixBlendMode: getComputedStyle(element).mixBlendMode,
        })"""
    )
    assert hero_image_style == {
        "objectFit": "contain",
        "opacity": "1",
        "mixBlendMode": "normal",
    }
    image_box = hero_image.bounding_box()
    assert image_box is not None
    assert 0.68 <= image_box["width"] / image_box["height"] <= 0.82
    hero_caption = page.locator(".home-hero__figure figcaption")
    assert "Bản Tuyên ngôn Độc lập — 1945" in hero_caption.inner_text()
    assert hero_caption.get_by_role("link", name="Trung tâm Lưu trữ quốc gia III").get_attribute(
        "href"
    ) == (
        "https://commons.wikimedia.org/wiki/"
        "File:B%E1%BA%A3n_Tuy%C3%AAn_ng%C3%B4n_%C4%91%E1%BB%99c_l%E1%BA%ADp_"
        "c%E1%BB%A7a_n%C6%B0%E1%BB%9Bc_Vi%E1%BB%87t_Nam_D%C3%A2n_ch%E1%BB%A7_"
        "C%E1%BB%99ng_h%C3%B2a._-_Trung_t%C3%A2m_L%C6%B0u_tr%E1%BB%AF_qu%E1%BB%91c_"
        "gia_III._Ph%C3%B4ng_Ph%E1%BB%A7_Th%E1%BB%A7_t%C6%B0%E1%BB%9Bng,_h%E1%BB%93_"
        "s%C6%A1_586,_t%E1%BB%9D_s%E1%BB%91_1_%E2%80%93_3.jpg"
    )
    assert page.locator(".trace-visual").count() == 0
    verify_text_contrast(page)

    page.get_by_text("Kho tư liệu nền", exact=True).wait_for()

    visible_topic_titles = page.locator(".topic-link__title").all_inner_texts()
    assert visible_topic_titles == [visible for _, visible, _, _ in TOPICS]

    for title, _, href, _ in TOPICS:
        topic_link = page.get_by_role("link", name=title, exact=True)
        assert topic_link.get_attribute("href") == href

    page.locator(".home-footer").get_by_text(
        "ĐUỐC HỒNG — 2026", exact=True
    ).wait_for()
    assert page.get_by_role(
        "link", name="Về dự án & phương pháp", exact=True
    ).get_attribute("href") == "/phuong-phap"
    assert page.get_by_role(
        "link", name="Hồ sơ tư tưởng sống", exact=True
    ).get_attribute("href") == "/ho-so"
    assert page.get_by_text("Prototype", exact=False).count() == 0


def verify_public_release_routes(page: Page) -> None:
    response = page.goto(
        f"{BASE_URL}/phuong-phap", wait_until="domcontentloaded", timeout=60_000
    )
    assert response is not None and response.ok
    assert page.title() == "Về dự án & phương pháp | Đuốc Hồng"
    assert page.locator('link[rel="canonical"]').get_attribute("href") == (
        "https://hcm-trace.vercel.app/phuong-phap"
    )
    assert page.get_by_role("heading", level=1).inner_text() == "Về dự án"
    assert page.get_by_role(
        "heading", name="Cách một Trace được xây dựng"
    ).count() == 1
    assert page.get_by_role("heading", name="Nguồn và kiểm chứng").count() == 1
    assert page.get_by_role(
        "heading", name="Hình ảnh và quyền sử dụng"
    ).count() == 1
    assert page.get_by_role(
        "heading", name="Giới hạn của trải nghiệm"
    ).count() == 1
    assert page.get_by_role(
        "link", name="Bắt đầu hành trình", exact=True
    ).get_attribute("href") == "/trace/dai-doan-ket"

    viewport_width, document_width = page.evaluate(
        "[document.documentElement.clientWidth, document.documentElement.scrollWidth]"
    )
    assert document_width <= viewport_width

    sitemap = page.goto(f"{BASE_URL}/sitemap.xml", wait_until="domcontentloaded")
    assert sitemap is not None and sitemap.ok
    sitemap_text = page.locator("body").inner_text()
    for path in [
        "/ho-so",
        "/trace/dai-doan-ket",
        "/trace/dao-duc-trach-nhiem",
        "/trace/con-nguoi",
        "/phuong-phap",
    ]:
        assert f"https://hcm-trace.vercel.app{path}" in sitemap_text

    robots = page.goto(f"{BASE_URL}/robots.txt", wait_until="domcontentloaded")
    assert robots is not None and robots.ok
    robots_text = page.locator("body").inner_text()
    assert "Allow: /" in robots_text
    assert "Sitemap: https://hcm-trace.vercel.app/sitemap.xml" in robots_text


def verify_homepage_reflow(page: Page) -> None:
    verify_homepage(page)
    verify_no_horizontal_overflow(page, "Homepage at 640px reflow width")
    verify_focus_indicator(page, ".primary-action")

    method_link = page.get_by_role(
        "link", name="Về dự án & phương pháp", exact=True
    )
    method_link.click()
    page.wait_for_url(f"{BASE_URL}/phuong-phap")
    verify_no_horizontal_overflow(page, "Methodology page at 640px reflow width")
    verify_focus_indicator(page, ".methodology__primary")


def verify_homepage_forced_colors(page: Page) -> None:
    response = page.goto(BASE_URL, wait_until="domcontentloaded", timeout=60_000)
    assert response is not None and response.ok
    verify_no_horizontal_overflow(page, "Homepage in forced colors")
    verify_focus_indicator(page, ".primary-action")
    verify_focus_indicator(page, ".home-footer a")


def verify_trace_routes(page: Page) -> None:
    for title, _, href, expected_headline in TOPICS:
        response = page.goto(
            f"{BASE_URL}{href}", wait_until="domcontentloaded", timeout=60_000
        )
        assert response is not None and response.ok
        try:
            page.wait_for_load_state("networkidle", timeout=10_000)
        except PlaywrightTimeoutError:
            pass
        heading = page.get_by_role("heading", level=1).inner_text()
        assert page.title() == f"{title} | Đuốc Hồng"
        assert page.locator('meta[name="description"]').get_attribute("content")
        assert (
            page.locator('meta[property="og:title"]').get_attribute("content")
            == f"{title} | Đuốc Hồng"
        )
        assert (
            page.locator('meta[property="og:site_name"]').get_attribute("content")
            == "Đuốc Hồng"
        )
        assert (
            page.locator('meta[property="og:locale"]').get_attribute("content")
            == "vi_VN"
        )
        assert page.get_by_role("link", name="ĐUỐC HỒNG").get_attribute("href") == "/"
        assert page.get_by_text("HCM // TRACE", exact=False).count() == 0
        assert expected_headline in heading


def verify_not_found(page: Page) -> None:
    response = page.goto(
        f"{BASE_URL}/khong-ton-tai",
        wait_until="domcontentloaded",
        timeout=60_000,
    )
    assert response is not None and response.status == 404
    assert page.title() == "Không tìm thấy | Đuốc Hồng"
    assert page.get_by_role("link", name="ĐUỐC HỒNG").get_attribute("href") == "/"
    assert page.get_by_text("HCM // TRACE", exact=False).count() == 0


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


def verify_reduced_motion_is_immediate(page: Page) -> None:
    for selector in [".home-hero__visual", ".topic-list li > div"]:
        locator = page.locator(selector).first
        locator.scroll_into_view_if_needed()
        page.wait_for_timeout(50)
        opacity = locator.evaluate(
            "element => Number.parseFloat(getComputedStyle(element).opacity)"
        )
        assert opacity == 1, f"{selector} remains faded with reduced motion"


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
        verify_public_release_routes(desktop)

        not_found = browser.new_page(viewport={"width": 1920, "height": 1080})
        verify_not_found(not_found)
        not_found.close()

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
            mobile.get_by_role(
                "link", name="Bắt đầu với một tình huống", exact=True
            ),
            mobile.get_by_role(
                "button", name="Chia sẻ trang Đuốc Hồng bằng mã QR", exact=True
            ),
            *[
                mobile.get_by_role("link", name=title, exact=True)
                for title, _, _, _ in TOPICS
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

        small_mobile = browser.new_page(viewport={"width": 375, "height": 812})
        small_mobile_errors = collect_console_errors(small_mobile)
        verify_homepage(small_mobile)
        small_viewport_width, small_document_width = small_mobile.evaluate(
            "[document.documentElement.clientWidth, document.documentElement.scrollWidth]"
        )
        assert small_document_width <= small_viewport_width
        prepare_full_page_screenshot(small_mobile)
        small_mobile.screenshot(
            path=str(SCREENSHOT_DIR / "homepage-small-mobile.png"),
            full_page=True,
        )

        reduced_motion = browser.new_page(
            viewport={"width": 390, "height": 844}, reduced_motion="reduce"
        )
        reduced_motion_errors = collect_console_errors(reduced_motion)
        verify_homepage(reduced_motion)
        verify_reduced_motion_is_immediate(reduced_motion)

        reflow = browser.new_page(viewport={"width": 640, "height": 900})
        reflow_errors = collect_console_errors(reflow)
        verify_homepage_reflow(reflow)

        forced_colors = browser.new_page(
            viewport={"width": 390, "height": 844}, forced_colors="active"
        )
        forced_colors_errors = collect_console_errors(forced_colors)
        verify_homepage_forced_colors(forced_colors)

        browser.close()

    errors = (
        desktop_errors
        + laptop_errors
        + mobile_errors
        + small_mobile_errors
        + reduced_motion_errors
        + reflow_errors
        + forced_colors_errors
    )
    assert not errors, f"Browser console errors: {errors}"
    print("Homepage acceptance passed")


if __name__ == "__main__":
    main()
