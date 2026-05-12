import { useEffect, useMemo, useState } from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { useLocation } from "react-router-dom";
import {
  HOME_ONBOARDING_KEY,
  readOnboardingCompleted,
  writeOnboardingCompleted,
} from "@/lib/onboardingStorage";

const HomeTour = () => {
  const [isRunning, setIsRunning] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const completed = readOnboardingCompleted(HOME_ONBOARDING_KEY);
    setIsRunning(!completed);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setIsRunning(false);
    }
  }, [pathname]);

  const steps = useMemo(
    () => [
      { target: '[data-tour="home-hero"]', content: "Chao mung ban den voi trang chu." },
      { target: '[data-tour="home-search"]', content: "Day la khu vuc tim kiem nhanh." },
      { target: '[data-tour="home-featured-tours"]', content: "Kham pha cac tour noi bat." },
      { target: '[data-tour="home-featured-dishes"]', content: "Mon an dac trung theo vung." },
      { target: '[data-tour="home-cta"]', content: "Bat dau hanh trinh cua ban tai day." },
    ],
    []
  );

  const onJoyrideCallback = (data: CallBackProps) => {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      writeOnboardingCompleted(HOME_ONBOARDING_KEY, true);
      setIsRunning(false);
      return;
    }

    if (!data.status || (data.status !== STATUS.FINISHED && data.status !== STATUS.SKIPPED)) {
      setIsRunning(false);
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={isRunning}
        callback={onJoyrideCallback}
        continuous
        showSkipButton
        disableScrolling
      />
      <button type="button" onClick={() => setIsRunning(true)}>
        Xem huong dan
      </button>
    </>
  );
};

export default HomeTour;
