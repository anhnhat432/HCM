"use client";

import { useEffect, useMemo, useState } from "react";

import { getCaseProgressMilestones } from "@/lib/thought-case-journey";

export function CaseProgress() {
  const milestones = useMemo(() => getCaseProgressMilestones(), []);
  const [activeId, setActiveId] = useState(milestones[0].id);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveMilestone = () => {
      const activationLine = window.innerHeight * 0.34;
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
    <nav aria-label="Tiến trình hồ sơ" className="case-progress">
      <div className="site-container case-progress__inner">
        <ol>
          {milestones.map((milestone, index) => {
            const isActive = activeId === milestone.id;

            return (
              <li key={milestone.id}>
                <a
                  aria-current={isActive ? "step" : undefined}
                  aria-label={milestone.ariaLabel}
                  href={milestone.href}
                  onClick={() => setActiveId(milestone.id)}
                >
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
