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
    os.environ.get("HCM_TRACE_SCREENSHOT_DIR", "artifacts/traces")
).resolve()

TRACE_CASES = {
    "trace-01": {
        "path": "/trace/dai-doan-ket",
        "title": "Đại đoàn kết",
        "chapter": "01 / 03",
        "headline": "Khi khác biệt",
        "question": "Điều gì có thể giữ một tập thể cùng hướng?",
        "years": ["1930", "1941", "1945"],
        "conclusion": "ĐẠI ĐOÀN KẾT DÂN TỘC",
        "next_title": "Đạo đức & trách nhiệm",
        "next_path": "/trace/dao-duc-trach-nhiem",
        "placeholder_count": 0,
        "historical_image_source_count": 3,
        "formation_source_count": 0,
        "presentations": [
            ("1930", "artwork", "contain", "landscape"),
            ("1941", "historical-place", "cover", "landscape"),
            ("1945", "historical-photo", "contain", "landscape"),
        ],
        "ending": "next-trace",
    },
    "trace-02": {
        "path": "/trace/dao-duc-trach-nhiem",
        "title": "Đạo đức & trách nhiệm",
        "chapter": "02 / 03",
        "headline": "Khi điều dễ làm",
        "question": (
            "Điều gì định hướng một lựa chọn đúng khi không ai buộc ta phải làm đúng?"
        ),
        "years": ["1927", "1947", "1958"],
        "conclusion": "ĐẠO ĐỨC & TRÁCH NHIỆM",
        "next_title": "Con người",
        "next_path": "/trace/con-nguoi",
        "placeholder_count": 0,
        "historical_image_source_count": 3,
        "formation_source_count": 0,
        "presentations": [
            ("1927", "document", "contain", "document"),
            ("1947", "document", "contain", "document"),
            ("1958", "document", "contain", "document"),
        ],
        "ending": "next-trace",
    },
    "trace-03": {
        "path": "/trace/con-nguoi",
        "title": "Con người",
        "chapter": "03 / 03",
        "headline": "Khi một con người",
        "question": "Giá trị của một con người được quyết định bởi điều gì?",
        "years": ["1945", "1958", "1969"],
        "conclusion": "CON NGƯỜI VỪA LÀ MỤC TIÊU, VỪA LÀ ĐỘNG LỰC",
        "placeholder_count": 0,
        "historical_image_source_count": 3,
        "formation_source_count": 3,
        "presentations": [
            ("1945", "historical-photo", "cover", "landscape"),
            ("1958", "historical-photo", "cover", "landscape"),
            ("1969", "document", "contain", "document"),
        ],
        "ending": "journey-closing",
    },
}

FOCUSED_MOMENTS = {
    "trace-01": ["1930", "1941", "1945"],
    "trace-02": ["1927", "1947", "1958"],
    "trace-03": ["1958", "1969"],
}

FOCUSED_OPENINGS = {
    "trace-01": "trace-01-present-focused.png",
    "trace-02": "trace-02-present-focused.png",
    "trace-03": "trace-03-present-focused.png",
}


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
    selectors = [
        ".trace-header__title",
        ".trace-opening__summary",
        ".trace-figure__credit",
        ".historical-moment__summary",
        ".historical-moment__metadata",
        ".historical-moment__sources",
        ".formation-factor p",
        ".application-item p",
        ".journey-closing__statement",
    ]

    for selector in selectors:
        if page.locator(selector).count() == 0:
            continue
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


def computed_line_height_ratio(locator) -> float:
    return locator.evaluate(
        """element => {
            const style = getComputedStyle(element);
            return Number.parseFloat(style.lineHeight) /
                Number.parseFloat(style.fontSize);
        }"""
    )


def assert_line_height_ratio(locator, expected: float, label: str) -> None:
    actual = computed_line_height_ratio(locator)
    assert abs(actual - expected) <= 0.01, (
        f"{label} line-height ratio is {actual:.3f}; expected {expected:.2f}"
    )


def verify_conclusion_line_spacing(page: Page, trace_case: dict) -> None:
    line_metrics = page.locator(
        ".thought-formation__conclusion h3 span"
    ).evaluate_all(
        """elements => elements.map(element => {
            const style = getComputedStyle(element);
            return {
                marginTop: Number.parseFloat(style.marginTop),
                fontSize: Number.parseFloat(style.fontSize),
            };
        })"""
    )
    assert len(line_metrics) >= 2
    assert line_metrics[0]["marginTop"] == 0

    margin_ratios = [
        metric["marginTop"] / metric["fontSize"] for metric in line_metrics[1:]
    ]
    assert all(abs(ratio - 0.18) <= 0.01 for ratio in margin_ratios), (
        f"{trace_case['path']} conclusion inter-line ratios are {margin_ratios}; "
        "expected 0.18"
    )


def verify_image_presentation(page: Page, trace_case: dict) -> None:
    opening_frame = page.locator(
        ".trace-opening .trace-figure__frame--kind-present"
    )
    assert opening_frame.count() == 1
    assert opening_frame.locator(".trace-figure__image").evaluate(
        "element => getComputedStyle(element).objectFit"
    ) == "cover"

    for year, kind, fit, aspect in trace_case["presentations"]:
        moment = page.locator(f"#moment-{year}")
        frame = moment.locator(
            f".trace-figure__frame--kind-{kind}.trace-figure__frame--aspect-{aspect}"
        )
        assert frame.count() == 1

        image = frame.locator(".trace-figure__image")
        if image.count() == 1:
            assert image.evaluate(
                "element => getComputedStyle(element).objectFit"
            ) == fit

        if aspect == "landscape":
            box = frame.bounding_box()
            assert box is not None
            assert box["width"] > box["height"]

    placeholders = page.locator(
        ".trace-figure__frame--kind-placeholder .trace-figure__placeholder"
    )
    assert placeholders.count() == trace_case["placeholder_count"]
    if placeholders.count():
        assert placeholders.locator("p").all_inner_texts() == [
            "Tư liệu đang được bổ sung"
        ] * trace_case["placeholder_count"]


def verify_trace(page: Page, trace_case: dict) -> None:
    response = page.goto(
        f"{BASE_URL}{trace_case['path']}",
        wait_until="domcontentloaded",
        timeout=60_000,
    )
    assert response is not None and response.ok
    settle_page(page)
    assert page.title() == f"{trace_case['title']} | Đuốc Hồng"
    assert page.locator('meta[name="description"]').get_attribute("content")
    assert (
        page.locator('meta[property="og:title"]').get_attribute("content")
        == f"{trace_case['title']} | Đuốc Hồng"
    )
    assert (
        page.locator('meta[property="og:site_name"]').get_attribute("content")
        == "Đuốc Hồng"
    )
    assert (
        page.locator('meta[property="og:locale"]').get_attribute("content")
        == "vi_VN"
    )

    headings = page.get_by_role("heading", level=1)
    assert headings.count() == 1
    assert trace_case["headline"] in headings.inner_text()

    for selector in [
        ".trace-opening__title",
        ".thought-formation__heading",
        ".thought-formation__conclusion h3",
        ".present-application__heading",
    ]:
        heading = page.locator(selector)
        visible_text = " ".join(heading.inner_text().split())
        dom_text = heading.evaluate(
            "element => element.textContent.replace(/\\s+/g, ' ').trim()"
        )
        assert dom_text.casefold() == visible_text.casefold(), (
            f"{selector} DOM text is concatenated"
        )

    header = page.locator(".trace-header")
    header.wait_for()
    assert header.evaluate("element => getComputedStyle(element).position") == "sticky"
    assert header.get_by_role("link", name="ĐUỐC HỒNG").get_attribute("href") == "/"
    assert page.get_by_text("HCM // TRACE", exact=False).count() == 0
    assert header.get_by_text(trace_case["title"], exact=True).count() == 1
    header.get_by_text(trace_case["chapter"], exact=True).wait_for()

    years = trace_case["years"]
    expected_stages = [
        "present-day",
        "trace-back",
        *years,
        "thought-formation",
        "return-2026",
        "application",
        trace_case["ending"],
    ]
    stages = page.locator("[data-trace-stage]").evaluate_all(
        "elements => elements.map(element => element.dataset.traceStage)"
    )
    assert stages == expected_stages

    question = page.locator(".trace-opening__question")
    question.wait_for()
    assert trace_case["question"] in question.inner_text()
    assert page.locator(".historical-moment__year").all_inner_texts() == years
    assert page.locator(".trace-figure__frame--kind-placeholder").count() == trace_case[
        "placeholder_count"
    ]
    assert page.locator(".historical-moment__sources").count() == 3
    assert page.locator(".historical-moment__sources a").count() >= 3
    assert page.locator(
        ".historical-moment .trace-figure__credit a"
    ).count() == trace_case["historical_image_source_count"]
    opening_credit = page.locator(".trace-opening .trace-figure__credit")
    assert opening_credit.inner_text() == "Nguồn ảnh: Ảnh minh họa"
    assert opening_credit.locator("a").count() == 0
    assert page.locator(".thought-formation__sources a").count() == trace_case[
        "formation_source_count"
    ]
    assert page.get_by_text("TODO:", exact=False).count() == 0
    verify_image_presentation(page, trace_case)
    verify_text_contrast(page)
    assert trace_case["conclusion"] in " ".join(
        page.locator(".thought-formation__conclusion h3").inner_text().split()
    )

    assert page.get_by_role(
        "img", name=f"Dòng thời gian từ 2026 đến {years[0]}"
    ).count() == 1
    assert page.get_by_role(
        "img", name=f"Dòng thời gian từ {years[-1]} đến 2026"
    ).count() == 1

    sequence_links = page.locator(
        ".historical-moment .trace-sequence-link"
    ).evaluate_all("links => links.map(link => link.getAttribute('href'))")
    assert sequence_links == [
        f"#moment-{years[1]}",
        f"#moment-{years[2]}",
        "#thought-formation",
    ]

    viewport_width = page.evaluate("window.innerWidth")
    assert_line_height_ratio(
        page.locator(".thought-formation__heading"),
        1.10,
        f"{trace_case['path']} Thought Formation",
    )
    assert_line_height_ratio(
        page.locator(".thought-formation__conclusion h3"),
        1.04,
        f"{trace_case['path']} conclusion",
    )
    verify_conclusion_line_spacing(page, trace_case)
    if trace_case["ending"] == "next-trace":
        expected_next_ratio = 1.07 if viewport_width <= 480 else 1.02
        assert_line_height_ratio(
            page.locator(".trace-navigation__title"),
            expected_next_ratio,
            f"{trace_case['path']} Next Trace",
        )

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

        historical_line_counts = rendered_line_count(
            page, ".historical-moment__summary"
        )
        assert all(lines <= 5 for lines in historical_line_counts), (
            f"{trace_case['path']} historical summaries exceed five lines: "
            f"{historical_line_counts}"
        )
        assert application_font_size <= 14.8
        assert application_gap <= 6.5
        assert all(
            lines <= 3 for lines in rendered_line_count(page, ".application-item p")
        )

    if trace_case["ending"] == "next-trace":
        assert page.get_by_role(
            "link", name=trace_case["next_title"], exact=True
        ).get_attribute("href") == trace_case["next_path"]
    else:
        closing = page.locator(".journey-closing")
        closing.wait_for()
        assert "Ba câu hỏi của hôm nay" in closing.inner_text()
        assert page.get_by_role(
            "link", name="Bắt đầu lại", exact=True
        ).get_attribute("href") == "/trace/dai-doan-ket"

    assert page.get_by_role("link", name="Về trang chủ", exact=True).get_attribute(
        "href"
    ) == "/"

    viewport_width, document_width = page.evaluate(
        "[document.documentElement.clientWidth, document.documentElement.scrollWidth]"
    )
    assert document_width <= viewport_width


def verify_mobile_targets(page: Page, trace_case: dict) -> None:
    ending_targets = (
        [trace_case["next_title"]]
        if trace_case["ending"] == "next-trace"
        else ["Khép lại hành trình", "Bắt đầu lại"]
    )

    for name in [
        "ĐUỐC HỒNG",
        "Nhìn lại quá khứ",
        "Xem cách áp dụng",
        *ending_targets,
        "Về trang chủ",
    ]:
        target = page.get_by_role("link", name=name, exact=True)
        box = target.bounding_box()
        assert box is not None and box["height"] >= 44

    for target in page.locator(".trace-source-link").all():
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


def verify_reduced_motion_is_immediate(page: Page) -> None:
    for selector in [
        ".trace-line__year--to",
        ".historical-moment__copy",
        ".historical-moment__visual",
    ]:
        locator = page.locator(selector).first
        locator.scroll_into_view_if_needed()
        page.wait_for_timeout(50)
        opacity = locator.evaluate(
            "element => Number.parseFloat(getComputedStyle(element).opacity)"
        )
        assert opacity == 1, f"{selector} remains faded with reduced motion"


def main() -> None:
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    viewports = {
        "desktop": {"width": 1920, "height": 1080},
        "laptop": {"width": 1366, "height": 768},
        "mobile": {"width": 390, "height": 844},
    }
    error_groups: list[list[str]] = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        for trace_name, trace_case in TRACE_CASES.items():
            for viewport_name, viewport in viewports.items():
                page = browser.new_page(viewport=viewport)
                error_groups.append(collect_console_errors(page))
                verify_trace(page, trace_case)
                if viewport_name == "mobile":
                    verify_mobile_targets(page, trace_case)
                prepare_full_page_screenshot(page)
                page.screenshot(
                    path=str(SCREENSHOT_DIR / f"{trace_name}-{viewport_name}.png"),
                    full_page=True,
                )
                if viewport_name in {"desktop", "mobile"}:
                    thought_formation = page.locator("section.thought-formation")
                    thought_formation.scroll_into_view_if_needed()
                    page.wait_for_timeout(150)
                    thought_formation.screenshot(
                        path=str(
                            SCREENSHOT_DIR
                            / f"{trace_name}-thought-{viewport_name}.png"
                        )
                    )
                if viewport_name == "desktop":
                    opening_filename = FOCUSED_OPENINGS.get(trace_name)
                    if opening_filename:
                        opening = page.locator("section.trace-opening")
                        opening.scroll_into_view_if_needed()
                        page.wait_for_timeout(150)
                        opening.screenshot(path=str(SCREENSHOT_DIR / opening_filename))
                    for year in FOCUSED_MOMENTS.get(trace_name, []):
                        moment = page.locator(f"#moment-{year}")
                        moment.scroll_into_view_if_needed()
                        page.wait_for_timeout(150)
                        moment.screenshot(
                            path=str(
                                SCREENSHOT_DIR / f"{trace_name}-{year}-focused.png"
                            )
                        )
                page.close()

            reduced_motion = browser.new_page(
                viewport=viewports["mobile"], reduced_motion="reduce"
            )
            error_groups.append(collect_console_errors(reduced_motion))
            verify_trace(reduced_motion, trace_case)
            verify_reduced_motion_is_immediate(reduced_motion)
            reduced_motion.close()

        browser.close()

    errors = [error for group in error_groups for error in group]
    assert not errors, f"Browser console errors: {errors}"
    print("Trace 01, Trace 02, and Trace 03 acceptance passed")


if __name__ == "__main__":
    main()
