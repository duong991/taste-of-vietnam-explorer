import type { ComponentType, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Compass,
  MapPinned,
  Search,
  Soup,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  ACTIONS,
  EVENTS,
  Joyride,
  type CallBackProps,
  STATUS,
  type TooltipRenderProps,
} from "react-joyride";
import { useLocation } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  HOME_ONBOARDING_KEY,
  readOnboardingCompleted,
  writeOnboardingCompleted,
} from "@/lib/onboardingStorage";

const TOUR_TARGETS = [
  '[data-tour="home-hero"]',
  '[data-tour="home-search"]',
  '[data-tour="home-featured-tours"]',
  '[data-tour="home-featured-dishes"]',
  '[data-tour="home-cta"]',
] as const;

type TourStepData = {
  eyebrow: string;
  icon: LucideIcon;
};

const HomeTourTooltip = ({ backProps, closeProps, index, isLastStep, primaryProps, skipProps, step, tooltipProps }: TooltipRenderProps) => {
  const data = (step.data ?? {}) as Partial<TourStepData>;
  const Icon = data.icon ?? Compass;
  const content = step.content as ReactNode;

  return (
    <div
      key={`home-tour-step-${index}`}
      className="react-joyride__tooltip"
      data-joyride-step={index}
      {...tooltipProps}
      aria-labelledby="home-tour-title"
      aria-describedby="home-tour-content"
    >
      <div className="animate-tour-step relative w-[min(92vw,420px)] overflow-hidden rounded-[26px] border border-border bg-[hsl(var(--background))] p-5 text-foreground shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,237,0.98)_0%,rgba(247,243,237,0.96)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/12 via-accent/6 to-transparent" />
        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-border/80" />
        <button
          type="button"
          {...closeProps}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "absolute right-3 top-3 z-10 h-9 w-9 rounded-full text-muted-foreground hover:bg-secondary",
          )}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <div className="animate-tour-orb flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary shadow-inner">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                {data.eyebrow}
              </p>
              <h3 id="home-tour-title" className="mt-1 font-display text-2xl leading-none text-foreground">
                {step.title}
              </h3>
            </div>
          </div>

          <div
            id="home-tour-content"
            className="text-[15px] leading-7 text-foreground/92"
          >
            {content}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 pt-4">
            <button
              type="button"
              {...skipProps}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "h-10 rounded-full px-4 text-muted-foreground hover:bg-secondary/80",
                isLastStep && "invisible",
              )}
            >
              {skipProps.title}
            </button>

            <div className="flex items-center gap-2">
              {index > 0 && (
                <button
                  type="button"
                  {...backProps}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "h-10 rounded-full border-primary/20 bg-background px-4 text-foreground hover:bg-primary/5",
                  )}
                >
                  {backProps.title}
                </button>
              )}

              <button
                type="button"
                {...primaryProps}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "h-10 rounded-full px-5 shadow-sm",
                )}
              >
                <span>{primaryProps.title}</span>
                {!isLastStep && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeTour = () => {
  const { pathname } = useLocation();
  const { t } = useLocale();
  const [isRunning, setIsRunning] = useState(false);
  const [tourKey, setTourKey] = useState(0);
  const autoStartTimerRef = useRef<number | null>(null);

  const stopTour = () => {
    setIsRunning(false);
  };

  const clearAutoStartTimer = () => {
    if (autoStartTimerRef.current !== null) {
      window.clearTimeout(autoStartTimerRef.current);
      autoStartTimerRef.current = null;
    }
  };

  const areTargetsReady = () =>
    TOUR_TARGETS.every((selector) => document.querySelector(selector));

  const queueTourStart = (reset = false, persistCompletion = false) => {
    clearAutoStartTimer();
    let attempts = 0;

    const tryStart = () => {
      if (areTargetsReady()) {
        if (reset) {
          setTourKey((current) => current + 1);
        }
        if (persistCompletion) {
          writeOnboardingCompleted(HOME_ONBOARDING_KEY, true);
        }
        setIsRunning(true);
        autoStartTimerRef.current = null;
        return;
      }

      if (attempts >= 20) {
        autoStartTimerRef.current = null;
        return;
      }

      attempts += 1;
      autoStartTimerRef.current = window.setTimeout(tryStart, 150);
    };

    autoStartTimerRef.current = window.setTimeout(tryStart, 0);
  };

  useEffect(() => {
    if (pathname !== "/") {
      clearAutoStartTimer();
      stopTour();
      return () => {
        clearAutoStartTimer();
      };
    }

    const completed = readOnboardingCompleted(HOME_ONBOARDING_KEY);
    if (!completed) {
      queueTourStart(false, true);
      return () => {
        clearAutoStartTimer();
      };
    }

    stopTour();

    return () => {
      clearAutoStartTimer();
    };
  }, [pathname]);

  const steps = useMemo(
    () => [
      {
        id: "hero",
        target: TOUR_TARGETS[0],
        title: t("onboarding.home.title_hero"),
        content: t("onboarding.home.step_hero"),
        skipBeacon: true,
        data: { eyebrow: t("onboarding.home.eyebrow_hero"), icon: Sparkles },
      },
      {
        id: "search",
        target: TOUR_TARGETS[1],
        title: t("onboarding.home.title_search"),
        content: t("onboarding.home.step_search"),
        skipBeacon: true,
        data: { eyebrow: t("onboarding.home.eyebrow_search"), icon: Search },
      },
      {
        id: "tours",
        target: TOUR_TARGETS[2],
        title: t("onboarding.home.title_tours"),
        content: t("onboarding.home.step_tours"),
        skipBeacon: true,
        data: { eyebrow: t("onboarding.home.eyebrow_tours"), icon: MapPinned },
      },
      {
        id: "dishes",
        target: TOUR_TARGETS[3],
        title: t("onboarding.home.title_dishes"),
        content: t("onboarding.home.step_dishes"),
        skipBeacon: true,
        data: { eyebrow: t("onboarding.home.eyebrow_dishes"), icon: Soup },
      },
      {
        id: "cta",
        target: TOUR_TARGETS[4],
        title: t("onboarding.home.title_cta"),
        content: t("onboarding.home.step_cta"),
        skipBeacon: true,
        data: { eyebrow: t("onboarding.home.eyebrow_cta"), icon: ArrowRight },
      },
    ],
    [t],
  );

  const startTour = () => {
    queueTourStart(true, false);
  };

  const onJoyrideCallback = (data: CallBackProps) => {
    if (data.type === EVENTS.TARGET_NOT_FOUND) {
      return;
    }

    if (
      data.status === STATUS.FINISHED ||
      data.status === STATUS.SKIPPED ||
      data.action === ACTIONS.CLOSE
    ) {
      writeOnboardingCompleted(HOME_ONBOARDING_KEY, true);
      clearAutoStartTimer();
      stopTour();
      return;
    }
  };

  return (
    <>
      <Joyride
        key={tourKey}
        steps={steps}
        run={isRunning}
        callback={onJoyrideCallback}
        continuous
        showProgress
        showSkipButton
        scrollToFirstStep
        tooltipComponent={HomeTourTooltip as ComponentType<TooltipRenderProps>}
        hideCloseButton={false}
        disableCloseOnEsc={false}
        disableOverlayClose={false}
        disableScrolling={false}
        spotlightClicks
        scrollOffset={96}
        styles={{
          options: {
            arrowColor: "hsl(var(--card))",
            backgroundColor: "hsl(var(--card))",
            overlayColor: "rgba(31, 41, 55, 0.45)",
            primaryColor: "hsl(var(--primary))",
            textColor: "hsl(var(--foreground))",
            zIndex: 60,
          },
          buttonBack: {
            color: "hsl(var(--foreground))",
            marginRight: 8,
          },
          buttonNext: {
            borderRadius: 9999,
            fontWeight: 600,
            padding: "10px 18px",
          },
          buttonSkip: {
            color: "hsl(var(--muted-foreground))",
          },
          tooltip: {
            backgroundColor: "transparent",
            borderRadius: 24,
            boxShadow: "none",
            padding: 0,
          },
          tooltipContent: {
            fontSize: 14,
            lineHeight: 1.65,
            padding: 0,
          },
          beacon: {
            display: "none",
          },
          beaconInner: {
            display: "none",
          },
          beaconOuter: {
            display: "none",
          },
          buttonClose: {
            color: "hsl(var(--muted-foreground))",
          },
          tooltipFooter: {
            alignItems: "center",
            padding: 0,
          },
        }}
        locale={{
          back: t("onboarding.home.back"),
          close: t("onboarding.home.close"),
          last: t("onboarding.home.done"),
          next: t("onboarding.home.next"),
          open: t("onboarding.home.open"),
          skip: t("onboarding.home.skip"),
        }}
      />

      <button
        type="button"
        onClick={startTour}
        aria-label={t("onboarding.home.replay")}
        className={cn(
          "fixed bottom-6 left-4 right-24 z-40 rounded-2xl border border-border/80 bg-background/95 p-3 text-left shadow-float backdrop-blur transition-smooth hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:left-6 sm:right-auto sm:w-[320px]",
          isRunning && "right-auto w-auto px-3 py-2 sm:w-auto",
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
            <Compass className="h-5 w-5" />
          </div>
          <div className={cn("min-w-0", isRunning && "hidden")}>
            <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              {t("onboarding.home.badge")}
            </div>
            <p className="font-display text-lg leading-tight text-foreground">{t("onboarding.home.replay")}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t("onboarding.home.replay_hint")}
            </p>
          </div>
        </div>
      </button>

    </>
  );
};

export default HomeTour;
