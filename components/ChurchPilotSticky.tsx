"use client";

import { useEffect, useRef, useState } from "react";

type PilotStep = {
  label: string;
  title: string;
  body: string;
};

const STEP_SCROLL_DISTANCE = 980;
const EDGE_RELEASE_DISTANCE = 980;
const STEP_COOLDOWN_MS = 260;

export function ChurchPilotSticky({ steps }: { steps: PilotStep[] }) {
  return (
    <>
      <MobilePilotSteps steps={steps} />
      <DesktopPilotSteps steps={steps} />
    </>
  );
}

function MobilePilotSteps({ steps }: { steps: PilotStep[] }) {
  return (
    <section className="bg-zoe-surface px-5 py-20 sm:px-8 lg:hidden">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-forest">A thoughtful path in</p>
        <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tighter-editorial">Start with a small pilot.</h2>
        <p className="mt-5 text-base font-medium leading-8 text-zoe-muted">
          You do not need to decide everything at once. Move through the questions in order.
        </p>
        <div className="mt-10 space-y-5">
          {steps.map((step, index) => (
            <PilotCard key={step.label} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopPilotSteps({ steps }: { steps: PilotStep[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeStepRef = useRef(activeStep);
  const stepProgress = useRef(0);
  const edgeProgress = useRef(0);
  const lastDirection = useRef(0);
  const releasedDirection = useRef(0);
  const lastStepAt = useRef(0);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (event: WheelEvent) => {
      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      const currentStep = activeStepRef.current;
      const canMoveForward = direction > 0 && currentStep < steps.length - 1;
      const canMoveBackward = direction < 0 && currentStep > 0;
      const canMove = canMoveForward || canMoveBackward;

      if (lastDirection.current !== direction) {
        stepProgress.current = 0;
        edgeProgress.current = 0;
        releasedDirection.current = 0;
        lastDirection.current = direction;
      }

      if (releasedDirection.current === direction) return;

      if (!canMove) {
        const leavingForward = direction > 0 && currentStep === steps.length - 1;
        const leavingBackward = direction < 0 && currentStep === 0;
        if (!leavingForward && !leavingBackward) return;

        edgeProgress.current += Math.abs(event.deltaY);
        if (edgeProgress.current < EDGE_RELEASE_DISTANCE) {
          event.preventDefault();
          return;
        }

        edgeProgress.current = 0;
        stepProgress.current = 0;
        releasedDirection.current = direction;
        return;
      }

      event.preventDefault();

      const now = Date.now();
      if (now - lastStepAt.current < STEP_COOLDOWN_MS) return;

      edgeProgress.current = 0;
      releasedDirection.current = 0;
      stepProgress.current += Math.abs(event.deltaY);
      if (stepProgress.current < STEP_SCROLL_DISTANCE) return;

      lastStepAt.current = now;
      stepProgress.current = 0;
      const nextStep = Math.max(0, Math.min(steps.length - 1, currentStep + direction));
      activeStepRef.current = nextStep;
      setActiveStep(nextStep);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      className="relative hidden overflow-hidden bg-zoe-surface px-8 py-20 lg:flex lg:min-h-[600px] lg:items-start xl:min-h-[640px]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[0.78fr_minmax(0,1.22fr)] items-center gap-12">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-forest">A thoughtful path in</p>
          <h2 className="mt-4 text-5xl font-bold leading-tight tracking-tighter-editorial">
            Start with a small pilot.
          </h2>
          <p className="mt-5 max-w-md text-base font-medium leading-8 text-zoe-muted">
            You do not need to decide everything at once. Move through the questions in order.
          </p>
          <div className="mt-8 flex gap-2">
            {steps.map((step, index) => (
              <span
                key={step.label}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  index === activeStep ? "w-8 bg-zoe-leaf" : "w-2 bg-zoe-outline/60",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        <div className="relative h-[24rem] overflow-visible">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const offset = index - activeStep;

            return (
              <div
                key={step.label}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `translateY(${offset * 48}px) scale(${isActive ? 1 : 0.96})`,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <PilotCard step={step} index={index} large />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PilotCard({ step, index, large = false }: { step: PilotStep; index: number; large?: boolean }) {
  return (
    <article
      className={[
        "w-full rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(45,50,49,0.12)] ring-1 ring-zoe-outline/25",
        large ? "p-9" : "p-7",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zoe-leaf">{step.label}</span>
          <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{step.title}</h3>
          <p className="mt-5 max-w-xl text-base font-medium leading-8 text-zoe-muted">{step.body}</p>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zoe-surface text-sm font-bold text-zoe-forest">
          0{index + 1}
        </span>
      </div>
    </article>
  );
}
