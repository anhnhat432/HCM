"use client";

import { useEffect, useMemo, useState } from "react";

import { getTraceProgressMilestones } from "@/lib/trace-journey";
import type { HistoricalMoments } from "@/types/trace";

interface TraceProgressProps {
  readonly moments: HistoricalMoments;
}

export function TraceProgress({ moments }: TraceProgressProps) {
  const milestones = useMemo(
    () => getTraceProgressMilestones(moments),
    [moments],
  );
  const [activeId, setActiveId] = useState(milestones[0].id);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveMilestone = () => {
      const activationLine = window.innerHeight * 0.35;
      let nextActive = milestones[0];

      for (const milestone of milestones) {
        const section = document.getElementById(milestone.id);

        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextActive = milestone;
        }
      }

      setActiveId((currentId) =>
        currentId === nextActive.id ? currentId : nextActive.id,
      );
    };

    const requestUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateActiveMilestone();
      });
    };

    updateActiveMilestone();
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("scroll", requestUpdate);
    };
  }, [milestones]);

  return (
    <nav className="trace-progress" aria-label="Tiến trình Trace">
      <div className="site-container trace-progress__inner">
        <ol className="trace-progress__list">
          {milestones.map((milestone) => {
            const isActive = milestone.id === activeId;

            return (
              <li className="trace-progress__item" key={milestone.id}>
                <a
                  aria-current={isActive ? "step" : undefined}
                  aria-label={milestone.ariaLabel}
                  className="trace-progress__link"
                  href={milestone.href}
                  onClick={() => setActiveId(milestone.id)}
                >
                  <span className="trace-progress__dot" aria-hidden="true" />
                  <span>{milestone.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
