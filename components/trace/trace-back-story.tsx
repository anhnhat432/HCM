"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import type { TraceImage } from "@/types/trace";

interface TraceBackStoryProps {
  readonly fromYear: string;
  readonly toYear: string;
  readonly presentImage: TraceImage & { readonly src: string };
  readonly historicalImage?: TraceImage;
  readonly headingId: string;
}

export function TraceBackStory({
  fromYear,
  toYear,
  presentImage,
  historicalImage,
  headingId,
}: TraceBackStoryProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const storyStart = useMotionValue(0);
  const storyEnd = useMotionValue(1);
  const scrollYProgress = useTransform(() => {
    const start = storyStart.get();
    const distance = storyEnd.get() - start;

    if (distance <= 0) {
      return 1;
    }

    return Math.min(1, Math.max(0, (scrollY.get() - start) / distance));
  });

  useLayoutEffect(() => {
    const story = storyRef.current;

    if (!story) {
      return;
    }

    const measureStory = () => {
      const start = story.getBoundingClientRect().top + window.scrollY;
      const end = start + story.offsetHeight - window.innerHeight;

      storyStart.set(start);
      storyEnd.set(Math.max(start + 1, end));
    };

    measureStory();

    const resizeObserver = new ResizeObserver(measureStory);
    resizeObserver.observe(story);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measureStory);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureStory);
    };
  }, [storyEnd, storyStart]);

  const presentOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.72, 0.9],
    [1, 0.34, 0],
  );
  const historicalClip = useTransform(
    scrollYProgress,
    [0.16, 0.78],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
  );
  const lineScale = useTransform(scrollYProgress, [0.12, 0.82], [0, 1]);
  const fromOpacity = useTransform(scrollYProgress, [0.1, 0.42], [1, 0.42]);
  const toOpacity = useTransform(scrollYProgress, [0.5, 0.84], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.52, 0.82], [0, 1]);

  return (
    <div
      className="trace-back-story"
      data-motion-state={shouldReduceMotion ? "static" : "scroll"}
      data-scroll-story="passive"
      ref={storyRef}
    >
      <noscript>
        <style>{`
          .trace-back-story { min-height: auto !important; }
          .trace-back-story__sticky { position: relative !important; top: auto !important; }
          .trace-back-story__present { opacity: 0 !important; }
          .trace-back-story__historical { clip-path: inset(0%) !important; }
          .trace-back-story__track > span { transform: scaleY(1) !important; }
          .trace-back-story__from-year { opacity: .42 !important; }
          .trace-back-story__to-year { opacity: 1 !important; }
          .trace-back-story__figure figcaption { opacity: 1 !important; }
        `}</style>
      </noscript>
      <div className="site-container trace-back-story__sticky">
        <div className="trace-back-story__copy">
          <p className="time-bridge__kicker">Để hiểu câu trả lời,</p>
          <h2 className="time-bridge__intro" id={headingId}>
            hãy lần theo dấu vết
            <br />
            của tư tưởng.
          </h2>
        </div>

        <div className="trace-back-story__visual">
          <figure className="trace-back-story__figure" aria-hidden="true">
            <div className="trace-back-story__frame">
              <motion.div
                className="trace-back-story__layer trace-back-story__present"
                style={{ opacity: presentOpacity }}
              >
                <Image
                  alt=""
                  className="trace-back-story__image"
                  fill
                  sizes="(max-width: 48rem) calc(100vw - 4rem), 560px"
                  src={presentImage.src}
                  style={{
                    objectFit: presentImage.presentation?.fit ?? "cover",
                    objectPosition: presentImage.presentation?.objectPosition,
                  }}
                />
              </motion.div>

              <motion.div
                className="trace-back-story__layer trace-back-story__historical"
                data-tone={historicalImage?.presentation?.tone ?? "archival"}
                style={{ clipPath: historicalClip }}
              >
                {historicalImage?.src ? (
                  <Image
                    alt=""
                    className="trace-back-story__image"
                    fill
                    sizes="(max-width: 48rem) calc(100vw - 4rem), 560px"
                    src={historicalImage.src}
                    style={{
                      objectFit: historicalImage.presentation?.fit ?? "cover",
                      objectPosition: historicalImage.presentation?.objectPosition,
                    }}
                  />
                ) : (
                  <span className="trace-back-story__fallback">{toYear}</span>
                )}
              </motion.div>
            </div>
            {historicalImage?.caption || historicalImage?.credit ? (
              <motion.figcaption style={{ opacity: captionOpacity }}>
                {historicalImage.caption ? (
                  <span>{historicalImage.caption}</span>
                ) : null}
                {historicalImage.credit ? (
                  <span>Nguồn ảnh: {historicalImage.credit}</span>
                ) : null}
              </motion.figcaption>
            ) : null}
          </figure>

          <div
            aria-label={`Dòng thời gian từ ${fromYear} đến ${toYear}`}
            className="trace-back-story__timeline"
            role="img"
          >
            <motion.time
              className="trace-back-story__year trace-back-story__from-year"
              style={{ opacity: fromOpacity }}
            >
              {fromYear}
            </motion.time>
            <span className="trace-back-story__track" aria-hidden="true">
              <motion.span
                style={{
                  scaleY: lineScale,
                  transformOrigin: "top",
                }}
              />
              <b />
            </span>
            <motion.time
              className="trace-back-story__year trace-back-story__to-year"
              style={{ opacity: toOpacity }}
            >
              {toYear}
            </motion.time>
          </div>
        </div>
      </div>
    </div>
  );
}
