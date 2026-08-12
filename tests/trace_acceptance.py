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
        "og_image": "/images/traces/dai-doan-ket/present-day-ai-group.jpg",
        "headline": "Khi khác biệt",
        "question": "Điều gì có thể giữ một tập thể cùng hướng?",
        "years": ["1930", "1941", "1945"],
        "moment_titles": [
            "Đảng Cộng sản Việt Nam",
            "Việt Minh",
            "Tuyên ngôn Độc lập",
        ],
        "source_counts": [2, 2, 1],
        "conclusion": "ĐẠI ĐOÀN KẾT DÂN TỘC",
        "application_titles": [
            "Tìm mục tiêu chung",
            "Tôn trọng khác biệt",
            "Biến đồng thuận thành hành động",
        ],
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
        "og_image": (
            "/images/traces/dao-duc-trach-nhiem/present-day-ai-decision.jpg"
        ),
        "headline": "Khi điều dễ làm",
        "question": (
            "Điều gì định hướng một lựa chọn đúng khi không ai buộc ta phải làm đúng?"
        ),
        "years": ["1927", "1947", "1958"],
        "moment_titles": [
            "Tư cách một người cách mệnh",
            "Sửa đổi lối làm việc",
            "Đạo đức cách mạng",
        ],
        "source_counts": [2, 2, 2],
        "conclusion": "ĐẠO ĐỨC & TRÁCH NHIỆM",
        "application_titles": [
            "Trung thực với lựa chọn",
            "Chịu trách nhiệm với hành động",
            "Đặt lợi ích chung đúng chỗ",
        ],
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
        "og_image": "/images/traces/con-nguoi/present-day-ai-student.jpg",
        "headline": "Khi một con người",
        "question": "Giá trị của một con người được quyết định bởi điều gì?",
        "years": ["1945", "1958", "1969"],
        "moment_titles": ["Tuyên ngôn Độc lập", "Trồng người", "Di chúc"],
        "source_counts": [2, 1, 1],
        "conclusion": "CON NGƯỜI VỪA LÀ MỤC TIÊU, VỪA LÀ ĐỘNG LỰC",
        "application_titles": [
            "Không thu gọn con người vào thành tích",
            "Tạo điều kiện để con người phát triển",
            "Đặt con người vào trung tâm",
        ],
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

JOURNEY_TAKEAWAYS = [
    "Khác biệt có thể cùng hướng khi được quy tụ bởi một mục tiêu chung.",
    "Lựa chọn đúng bắt đầu từ tự rèn mình và trách nhiệm với lợi ích chung.",
    "Phát triển có ý nghĩa khi con người được tôn trọng và có cơ hội trưởng thành.",
]

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


def text_contrast_ratio(
    page: Page, selector: str, *, include_opacity: bool = True
) -> float:
    locator = page.locator(selector).first
    locator.evaluate("element => element.scrollIntoView({ block: 'center' })")
    handle = locator.element_handle()
    page.wait_for_function(
        """element => {
            let current = element;
            while (current) {
                if (Number.parseFloat(getComputedStyle(current).opacity) < 0.99) {
                    return false;
                }
                current = current.parentElement;
            }
            return true;
        }""",
        arg=handle,
    )
    return locator.evaluate(
        """(element, includeOpacity) => {
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
            let opacity = 1;
            if (includeOpacity) {
                let current = element;
                while (current) {
                    opacity *= Number.parseFloat(getComputedStyle(current).opacity);
                    current = current.parentElement;
                }
            }
            const canvas = parseColor(
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--color-canvas')
                    .trim()
            );
            const backgroundLayers = [];
            let current = element;
            while (current) {
                const layer = parseColor(getComputedStyle(current).backgroundColor);
                if (layer.a > 0) {
                    backgroundLayers.push(layer);
                }
                current = current.parentElement;
            }
            const background = backgroundLayers.reverse().reduce(
                (rendered, layer) => ({ ...blend(layer, rendered), a: 1 }),
                canvas,
            );
            const renderedForeground = blend(
                { ...foreground, a: foreground.a * opacity },
                background
            );
            const foregroundLuminance = luminance(renderedForeground);
            const backgroundLuminance = luminance(background);
            return (
                (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
                (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
            );
        }""",
        include_opacity,
    )


def verify_text_contrast(page: Page) -> None:
    selectors = [
        ".trace-header__title",
        ".trace-opening__summary",
        ".trace-figure__credit",
        ".historical-moment__summary",
        ".historical-moment__metadata",
        ".time-bridge__kicker",
        ".time-bridge__cue",
        ".source-drawer-trigger",
        ".formation-factor p",
        ".application-item p",
        ".journey-closing__statement",
    ]

    for selector in selectors:
        locator = page.locator(selector).first
        if page.locator(selector).count() == 0 or not locator.is_visible():
            continue
        ratio = text_contrast_ratio(page, selector)
        assert ratio >= 4.5, f"{selector} contrast is only {ratio:.2f}:1"

    for selector in [
        '.trace-progress__link:not([aria-current="step"])',
        '.trace-progress__link[aria-current="step"]',
    ]:
        if not page.locator(selector).first.is_visible():
            continue
        ratio = text_contrast_ratio(page, selector, include_opacity=True)
        assert ratio >= 4.5, f"{selector} contrast is only {ratio:.2f}:1"

    for selector in [
        ".trace-line__year--to",
        ".trace-line--return .trace-line__year--from",
    ]:
        if not page.locator(selector).first.is_visible():
            continue
        ratio = text_contrast_ratio(page, selector)
        assert ratio >= 3, f"{selector} contrast is only {ratio:.2f}:1"


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


def verify_qr_share_dialog(page: Page, trace_case: dict) -> None:
    trigger = page.get_by_role(
        "button",
        name=f"Chia sẻ Trace {trace_case['title']} bằng mã QR",
        exact=True,
    )
    trigger.click()
    dialog = page.get_by_role("dialog", name="Chia sẻ bằng mã QR")
    dialog.wait_for()
    page.wait_for_function(
        """() => document.querySelector(
            '.qr-share__code img'
        )?.getAttribute('src')?.startsWith('data:image/png')"""
    )
    assert f"https://hcm-trace.vercel.app{trace_case['path']}" in dialog.inner_text()
    assert page.get_by_role(
        "button", name="Đóng chia sẻ bằng mã QR"
    ).evaluate("element => element === document.activeElement")
    page.keyboard.press("Escape")
    dialog.wait_for(state="detached")
    page.wait_for_function(
        "element => element === document.activeElement", arg=trigger.element_handle()
    )


def verify_trace_back_story(page: Page, trace_case: dict) -> None:
    story = page.locator(".trace-back-story")
    assert story.count() == 1
    assert story.get_attribute("data-scroll-story") == "passive"
    assert story.locator('input, button, [role="slider"]').count() == 0
    assert story.locator(".trace-back-story__layer").count() == 2

    reduced_motion = page.evaluate(
        "matchMedia('(prefers-reduced-motion: reduce)').matches"
    )
    viewport_width = page.evaluate("window.innerWidth")

    if reduced_motion or 640 <= viewport_width <= 768:
        historical_clip = story.locator(
            ".trace-back-story__historical"
        ).evaluate("element => getComputedStyle(element).clipPath")
        assert historical_clip in {
            "inset(0%)",
            "inset(0px)",
            "inset(0% 0px 0px)",
        }
        return

    page.wait_for_function(
        """() => document.querySelector(
            '.trace-back-story'
        )?.dataset.motionState === 'scroll'"""
    )
    story_handle = story.element_handle()
    assert story_handle is not None
    page.evaluate(
        """element => window.scrollTo(
            0,
            element.getBoundingClientRect().top + window.scrollY
        )""",
        story_handle,
    )
    page.wait_for_function(
        """() => getComputedStyle(
            document.querySelector('.trace-back-story__historical')
        ).clipPath.includes('100%')"""
    )
    start_clip = story.locator(".trace-back-story__historical").evaluate(
        "element => getComputedStyle(element).clipPath"
    )
    historical_caption = story.locator("figcaption")
    if historical_caption.count():
        assert historical_caption.evaluate(
            "element => Number.parseFloat(getComputedStyle(element).opacity)"
        ) < 0.1

    clip_samples = page.evaluate(
        """async element => {
            const start = element.getBoundingClientRect().top + window.scrollY;
            const distance = element.offsetHeight - window.innerHeight;
            const historical = element.querySelector(
                '.trace-back-story__historical'
            );
            const samples = [];

            for (let step = 0; step <= 8; step += 1) {
                window.scrollTo(0, start + distance * (step / 8));
                await new Promise(resolve => requestAnimationFrame(
                    () => requestAnimationFrame(resolve)
                ));
                const clipPath = getComputedStyle(historical).clipPath;
                samples.push(Number.parseFloat(clipPath.match(
                    /inset\\(([-\\d.]+)%/
                )?.[1] ?? 'NaN'));
            }

            return samples;
        }""",
        story_handle,
    )
    assert all(value == value for value in clip_samples), clip_samples
    assert all(
        next_value <= current_value + 0.75
        for current_value, next_value in zip(clip_samples, clip_samples[1:])
    ), f"Trace Back historical reveal reversed while scrolling: {clip_samples}"

    page.evaluate(
        """element => window.scrollTo(
            0,
            element.getBoundingClientRect().top + window.scrollY
              + element.offsetHeight - window.innerHeight
        )""",
        story_handle,
    )
    page.wait_for_function(
        """() => Number.parseFloat(getComputedStyle(
            document.querySelector('.trace-back-story__to-year')
        ).opacity) > 0.95"""
    )
    end_clip = story.locator(".trace-back-story__historical").evaluate(
        "element => getComputedStyle(element).clipPath"
    )
    assert start_clip != end_clip
    if historical_caption.count():
        assert historical_caption.evaluate(
            "element => Number.parseFloat(getComputedStyle(element).opacity)"
        ) > 0.95

    first_moment = page.locator(f"#moment-{trace_case['years'][0]}")
    first_moment.evaluate("element => element.scrollIntoView({ block: 'start' })")
    assert first_moment.get_by_role("heading", level=2).is_visible()


def verify_formation_convergence(page: Page) -> None:
    assert page.locator(".historical-moment__continuity").count() == 3

    convergence = page.locator(".formation-convergence")
    graphic = convergence.locator(".formation-convergence__graphic")
    assert convergence.count() == 1
    assert graphic.get_attribute("aria-hidden") == "true"
    assert graphic.get_attribute("focusable") == "false"
    assert convergence.locator(".formation-convergence__branch").count() == 3
    assert convergence.locator(".formation-convergence__merged").count() == 1

    conclusion = page.locator(".thought-formation__conclusion")
    conclusion.evaluate("element => element.scrollIntoView({ block: 'center' })")
    page.wait_for_function(
        """element => Number.parseFloat(
            getComputedStyle(element.parentElement).opacity
        ) > 0.95""",
        arg=conclusion.element_handle(),
    )
    assert conclusion.get_by_role("heading", level=3).is_visible()

    if page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"):
        assert convergence.locator(
            ".formation-convergence__branch, .formation-convergence__merged"
        ).evaluate_all(
            """paths => paths.every(path =>
                getComputedStyle(path).strokeDasharray === 'none'
            )"""
        )


def verify_journey_trace_mark(page: Page, trace_case: dict) -> None:
    mark = page.locator(".journey-trace-mark")

    if trace_case["ending"] != "journey-closing":
        assert mark.count() == 0
        return

    assert mark.count() == 1
    assert page.locator("#journey-closing .journey-trace-mark").count() == 1
    assert mark.get_attribute("aria-hidden") == "true"
    assert mark.locator(".journey-trace-mark__input").count() == 3
    assert mark.locator(".journey-trace-mark__torch").count() == 1

    mark.scroll_into_view_if_needed()
    page.wait_for_function(
        """() => Number.parseFloat(getComputedStyle(
            document.querySelector('.journey-trace-mark__torch')
        ).strokeDashoffset) <= 0.05"""
    )
    mark_box = mark.bounding_box()
    assert mark_box is not None
    max_height = 112 if page.evaluate("window.innerWidth <= 768") else 160
    assert mark_box["height"] <= max_height

    if page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"):
        assert mark.locator(
            ".journey-trace-mark__input, .journey-trace-mark__torch"
        ).evaluate_all(
            """paths => paths.every(path =>
                getComputedStyle(path).strokeDasharray === 'none'
            )"""
        )


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


def verify_trace_switcher(page: Page, trace_case: dict) -> None:
    trigger = page.locator(".trace-switcher__trigger")
    menu = page.get_by_role("navigation", name="Chuyển Trace")

    assert trigger.get_attribute("aria-expanded") == "false"
    trigger.click()
    assert trigger.get_attribute("aria-expanded") == "true"
    menu.wait_for(state="visible")

    links = menu.get_by_role("link")
    assert links.count() == 3
    assert links.evaluate_all(
        "items => items.map(item => item.getAttribute('href'))"
    ) == [
        "/trace/dai-doan-ket",
        "/trace/dao-duc-trach-nhiem",
        "/trace/con-nguoi",
    ]
    current = menu.locator('[aria-current="page"]')
    assert current.get_attribute("href") == trace_case["path"]
    assert "✓" in current.inner_text()

    page.keyboard.press("Escape")
    menu.wait_for(state="hidden")
    assert trigger.get_attribute("aria-expanded") == "false"
    assert trigger.evaluate("element => document.activeElement === element")

    trigger.press("Enter")
    menu.wait_for(state="visible")
    page.wait_for_function(
        "() => document.activeElement?.getAttribute('aria-current') === 'page'"
    )
    current_index = list(TRACE_CASES).index(
        next(name for name, case in TRACE_CASES.items() if case is trace_case)
    )
    expected_next_path = list(TRACE_CASES.values())[
        (current_index + 1) % len(TRACE_CASES)
    ]["path"]
    page.keyboard.press("ArrowDown")
    assert page.evaluate("document.activeElement?.getAttribute('href')") == (
        expected_next_path
    )
    page.keyboard.press("Escape")
    menu.wait_for(state="hidden")
    assert trigger.evaluate("element => document.activeElement === element")

    trigger.click()
    menu.wait_for(state="visible")
    page.mouse.click(8, 150)
    menu.wait_for(state="hidden")


def verify_source_drawer(page: Page, trace_case: dict) -> None:
    year = trace_case["years"][0]
    title = trace_case["moment_titles"][0]
    moment = page.locator(f"#moment-{year}")
    trigger = moment.get_by_role(
        "button", name=f"Nguồn và kiểm chứng cho {title}, {year}"
    )
    trigger_handle = trigger.element_handle()
    assert trigger_handle
    figure_caption = moment.locator(
        ".trace-figure__caption > span"
    ).first.text_content()
    assert figure_caption
    figure_source = moment.locator(".trace-figure__credit a").get_attribute("href")

    trigger.click()
    dialog = page.get_by_role("dialog", name=title)
    dialog.wait_for(state="visible")
    page.wait_for_function(
        """() => [...document.querySelectorAll(
            '.source-drawer__overlay, .source-drawer'
        )].every(element => element.getAnimations().every(
            animation => animation.playState === 'finished'
        ))"""
    )
    assert dialog.get_by_role("heading", level=2).inner_text() == title
    assert dialog.locator("time").inner_text() == year
    assert dialog.get_by_role("heading", name="Kiểm chứng").count() == 1
    verification_id = dialog.get_attribute("aria-describedby")
    assert verification_id
    assert dialog.locator(f'[id="{verification_id}"]').inner_text()

    source_links = dialog.locator(".source-drawer__sources a")
    assert source_links.count() == trace_case["source_counts"][0]
    assert all(
        link.get_attribute("target") == "_blank" for link in source_links.all()
    )
    image_details = dialog.locator(".source-drawer__image-details")
    image_details_text = image_details.text_content()
    assert image_details_text
    assert figure_caption in image_details_text
    assert dialog.locator(".source-drawer__image-details a").get_attribute(
        "href"
    ) == figure_source
    assert "Giấy phép" in image_details_text
    assert "Trạng thái sử dụng" in image_details_text
    assert page.evaluate("document.body.style.overflow") == "hidden"
    page.wait_for_function(
        "() => document.activeElement?.getAttribute('aria-label') === "
        "'Đóng nguồn và kiểm chứng'"
    )

    page.keyboard.press("Shift+Tab")
    assert dialog.locator(":focus").count() == 1

    viewport_width = page.evaluate("window.innerWidth")
    if viewport_width <= 480:
        drawer_box = dialog.bounding_box()
        assert drawer_box is not None
        assert drawer_box["width"] <= viewport_width + 0.5
        assert drawer_box["width"] >= viewport_width * 0.88

    page.keyboard.press("Escape")
    dialog.wait_for(state="detached")
    page.wait_for_function(
        "trigger => document.activeElement === trigger", arg=trigger_handle
    )
    assert page.evaluate("document.body.style.overflow") != "hidden"

    trigger.click()
    overlay = page.locator(".source-drawer__overlay")
    overlay.wait_for(state="visible")
    if viewport_width > 480:
        overlay.click(position={"x": 8, "y": 8})
    else:
        page.get_by_role("button", name="Đóng nguồn và kiểm chứng").click()
    overlay.wait_for(state="detached")
    page.wait_for_function(
        "trigger => document.activeElement === trigger", arg=trigger_handle
    )


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
    assert page.locator('link[rel="canonical"]').get_attribute("href") == (
        f"https://hcm-trace.vercel.app{trace_case['path']}"
    )
    assert page.locator('meta[property="og:image"]').get_attribute(
        "content"
    ).endswith(trace_case["og_image"])
    assert page.locator('meta[name="twitter:image"]').get_attribute(
        "content"
    ).endswith(trace_case["og_image"])

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
    assert header.locator(".trace-header__title").text_content() == trace_case["title"]
    assert header.locator(".trace-switcher__trigger > span").first.inner_text() == (
        trace_case["chapter"]
    )
    verify_trace_switcher(page, trace_case)

    progress = page.get_by_role("navigation", name="Tiến trình Trace")
    progress_links = progress.get_by_role("link")
    assert progress_links.count() == 5
    assert progress_links.all_inner_texts() == ["2026", *trace_case["years"], "2026"]
    assert progress_links.evaluate_all(
        "links => links.map(link => link.getAttribute('href'))"
    ) == [
        "#trace-opening",
        *[f"#moment-{year}" for year in trace_case["years"]],
        "#application",
    ]
    assert progress.locator('[aria-current="step"]').get_attribute("href") == (
        "#trace-opening"
    )

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
    viewport_width = page.evaluate("window.innerWidth")
    viewport_height = page.evaluate("window.innerHeight")
    if trace_case["path"] == "/trace/dai-doan-ket" and viewport_width in {
        1920,
        390,
    }:
        verify_qr_share_dialog(page, trace_case)
    verify_trace_back_story(page, trace_case)
    verify_formation_convergence(page)
    verify_journey_trace_mark(page, trace_case)
    opening_action = page.get_by_role("link", name="Nhìn lại quá khứ", exact=True)
    if viewport_width >= 1024 and viewport_height <= 820:
        action_box = opening_action.bounding_box()
        assert action_box is not None
        assert action_box["y"] + action_box["height"] <= viewport_height, (
            f"{trace_case['path']} opening action falls below the laptop fold"
        )
    elif viewport_width <= 480:
        question_box = question.bounding_box()
        assert question_box is not None
        assert question_box["y"] <= viewport_height * 0.88, (
            f"{trace_case['path']} central question appears too late on mobile"
        )
    assert page.locator(".historical-moment__year").all_inner_texts() == years
    assert page.locator(".trace-figure__frame--kind-placeholder").count() == trace_case[
        "placeholder_count"
    ]
    assert page.locator(".historical-moment__sources").count() == 0
    assert page.locator(".source-drawer-trigger").count() == 3
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
    verify_source_drawer(page, trace_case)
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

    for year in years:
        moment = page.locator(f"#moment-{year}")
        source_box = moment.locator(".source-drawer-trigger").bounding_box()
        sequence_box = moment.locator(".trace-sequence-link").bounding_box()
        assert source_box is not None and sequence_box is not None
        assert sequence_box["y"] >= source_box["y"] + source_box["height"] + 6, (
            f"{trace_case['path']} {year} source utility competes with continuation"
        )

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

    for year in years:
        href = f"#moment-{year}"
        page.locator(href).scroll_into_view_if_needed()
        page.wait_for_function(
            """expectedHref => document.querySelector(
                '.trace-progress [aria-current="step"]'
            )?.getAttribute('href') === expectedHref""",
            arg=href,
        )

    application = page.locator("#application")
    application.scroll_into_view_if_needed()
    page.wait_for_function(
        """() => document.querySelector(
            '.trace-progress [aria-current="step"]'
        )?.getAttribute('href') === '#application'"""
    )

    if trace_case["path"] == "/trace/dai-doan-ket":
        page.locator("#trace-opening").scroll_into_view_if_needed()
        page.wait_for_function(
            """() => document.querySelector(
                '.trace-progress [aria-current="step"]'
            )?.getAttribute('href') === '#trace-opening'"""
        )
        page.locator("#trace-recap").scroll_into_view_if_needed()
        page.wait_for_function(
            """() => document.querySelector(
                '.trace-progress [aria-current="step"]'
            )?.getAttribute('href') === '#application'"""
        )

    recap = page.locator("#trace-recap")
    assert recap.get_by_role("heading", level=2).inner_text() == trace_case["question"]
    assert recap.locator(".trace-recap__after li strong").all_text_contents() == (
        trace_case["application_titles"]
    )
    assert page.locator(".present-application .trace-sequence-link").get_attribute(
        "href"
    ) == "#trace-recap"
    ending_selector = (
        ".trace-navigation"
        if trace_case["ending"] == "next-trace"
        else ".journey-closing"
    )
    assert page.locator(f"#trace-recap + {ending_selector}").count() == 1
    if trace_case["ending"] == "next-trace":
        expected_next_ratio = 1.07 if viewport_width <= 768 else 1.02
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
        convergence_width = page.locator(
            ".formation-convergence__merged"
        ).evaluate(
            "element => Number.parseFloat(getComputedStyle(element).strokeWidth)"
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
        assert closing.locator(".journey-closing__topics p").all_inner_texts() == (
            JOURNEY_TAKEAWAYS
        )
        assert page.get_by_role(
            "link", name="Bắt đầu lại", exact=True
        ).get_attribute("href") == "/trace/dai-doan-ket"
        assert page.get_by_role(
            "link", name="Về dự án & phương pháp", exact=True
        ).get_attribute("href") == "/phuong-phap"
        if viewport_width >= 1024 and viewport_height <= 820:
            page.evaluate(
                "() => document.querySelector('#journey-closing')?.scrollIntoView()"
            )
            first_takeaway = closing.locator(
                ".journey-closing__topics p"
            ).first.bounding_box()
            assert first_takeaway is not None
            assert first_takeaway["y"] + first_takeaway["height"] <= (
                viewport_height
            ), "Journey Closing takeaway must appear in the entry viewport"

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
        else ["Bắt đầu lại"]
    )

    for name in [
        "ĐUỐC HỒNG",
        "Nhìn lại quá khứ",
        "Xem cách áp dụng",
        "Nhìn lại hành trình",
        *ending_targets,
        *(
            ["Về dự án & phương pháp"]
            if trace_case["ending"] == "journey-closing"
            else []
        ),
        "Về trang chủ",
    ]:
        target = page.get_by_role("link", name=name, exact=True)
        box = target.bounding_box()
        assert box is not None and box["height"] >= 44

    switcher = page.locator(".trace-switcher__trigger")
    switcher_box = switcher.bounding_box()
    assert switcher_box is not None and switcher_box["height"] >= 44

    qr_trigger = page.get_by_role(
        "button",
        name=f"Chia sẻ Trace {trace_case['title']} bằng mã QR",
        exact=True,
    )
    qr_box = qr_trigger.bounding_box()
    assert qr_box is not None and qr_box["height"] >= 44

    for target in page.locator(".source-drawer-trigger").all():
        box = target.bounding_box()
        assert box is not None and box["height"] >= 44

    for target in page.locator(".trace-source-link").all():
        box = target.bounding_box()
        assert box is not None and box["height"] >= 44

    for target in page.locator(".trace-progress__link").all():
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


def verify_source_drawer_keyboard(page: Page) -> None:
    trigger = page.locator(".source-drawer-trigger").first
    trigger.scroll_into_view_if_needed()
    trigger.focus()
    verify_focus_indicator(page, ".source-drawer-trigger")
    page.keyboard.press("Enter")

    dialog = page.get_by_role("dialog")
    dialog.wait_for()
    close_button = page.get_by_role("button", name="Đóng nguồn và kiểm chứng")
    close_button.wait_for()
    assert close_button.evaluate("element => element === document.activeElement")
    verify_focus_indicator(page, ".source-drawer__close")

    page.keyboard.press("Escape")
    dialog.wait_for(state="hidden")
    page.wait_for_function(
        "element => element === document.activeElement", arg=trigger.element_handle()
    )


def verify_trace_reflow(page: Page, trace_case: dict) -> None:
    verify_trace(page, trace_case)
    verify_no_horizontal_overflow(page, "Trace 01 at 640px reflow width")
    verify_focus_indicator(page, '.trace-progress__link[href="#moment-1930"]')

    moment_link = page.locator('.trace-progress__link[href="#moment-1930"]')
    moment_link.click()
    page.wait_for_function("() => location.hash === '#moment-1930'")
    assert page.locator("#moment-1930").count() == 1
    verify_source_drawer_keyboard(page)


def verify_trace_forced_colors(page: Page, trace_case: dict) -> None:
    response = page.goto(
        f"{BASE_URL}{trace_case['path']}",
        wait_until="domcontentloaded",
        timeout=60_000,
    )
    assert response is not None and response.ok
    settle_page(page)
    verify_no_horizontal_overflow(page, "Trace 01 in forced colors")
    verify_focus_indicator(page, ".trace-switcher__trigger")
    verify_focus_indicator(page, ".trace-progress__link")
    verify_source_drawer_keyboard(page)


def main() -> None:
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    viewports = {
        "desktop": {"width": 1920, "height": 1080},
        "laptop": {"width": 1366, "height": 768},
        "mobile": {"width": 390, "height": 844},
        "small-mobile": {"width": 375, "height": 812},
    }
    error_groups: list[list[str]] = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        for trace_name, trace_case in TRACE_CASES.items():
            for viewport_name, viewport in viewports.items():
                page = browser.new_page(viewport=viewport)
                error_groups.append(collect_console_errors(page))
                verify_trace(page, trace_case)
                if viewport_name in {"mobile", "small-mobile"}:
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

        reflow = browser.new_page(viewport={"width": 640, "height": 900})
        error_groups.append(collect_console_errors(reflow))
        verify_trace_reflow(reflow, TRACE_CASES["trace-01"])
        reflow.close()

        forced_colors = browser.new_page(
            viewport={"width": 390, "height": 844}, forced_colors="active"
        )
        error_groups.append(collect_console_errors(forced_colors))
        verify_trace_forced_colors(forced_colors, TRACE_CASES["trace-01"])
        forced_colors.close()

        switcher_navigation = browser.new_page(
            viewport={"width": 1366, "height": 768}
        )
        switcher_navigation.goto(
            f"{BASE_URL}/trace/dai-doan-ket", wait_until="domcontentloaded"
        )
        settle_page(switcher_navigation)
        switcher_navigation.locator(".trace-switcher__trigger").click()
        switcher_navigation.get_by_role("navigation", name="Chuyển Trace").get_by_role(
            "link", name="Đạo đức & trách nhiệm"
        ).click()
        switcher_navigation.wait_for_url(
            f"{BASE_URL}/trace/dao-duc-trach-nhiem"
        )
        assert "Khi điều dễ làm" in switcher_navigation.get_by_role(
            "heading", level=1
        ).inner_text()
        switcher_navigation.close()

        browser.close()

    errors = [error for group in error_groups for error in group]
    assert not errors, f"Browser console errors: {errors}"
    print("Trace 01, Trace 02, and Trace 03 acceptance passed")


if __name__ == "__main__":
    main()
