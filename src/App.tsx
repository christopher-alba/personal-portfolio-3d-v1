import { DefaultTheme, ThemeProvider } from "styled-components";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import themes from "./themes/schema.json";
import { Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import { GlobalStyles } from "./themes/globalStyles";
import MyServices from "./pages/MyServices/MyServices";
import BottomNav from "./components/BottomNav/BottomNav";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TransitionLeftSvg from "./svg/TransitionLeftSvg";
import TransitionRightSVG from "./svg/TransitionRightSvg";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")?.length ?? -1 > 0
      ? JSON.parse(localStorage.getItem("theme") as string)
      : themes.light
  );

  const [transitionLeft, setTransitionLeft] = useState(false);
  const [transitionRight, setTransitionRight] = useState(false);
  const [hideTransitionLeft, setHideTransitionLeft] = useState(false);
  const [hideTransitionRight, setHideTransitionRight] = useState(false);
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  const navigate = useNavigate();

  const updateTheme = (themeName: string) => {
    if (themeName === "light") {
      localStorage.setItem("theme", JSON.stringify(themes.light));
      setTheme(themes.light);
    } else {
      localStorage.setItem("theme", JSON.stringify(themes.dark));
      setTheme(themes.dark);
    }
  };

  useEffect(() => {
    const localTheme: DefaultTheme | null = JSON.parse(
      localStorage.getItem("theme") ?? "{}"
    ) as DefaultTheme | null;

    if (localTheme?.name) {
      if (localTheme.name === "light") {
        if (JSON.stringify(themes.light) !== JSON.stringify(localTheme)) {
          updateTheme("light");
        }
      } else if (localTheme.name === "dark") {
        if (JSON.stringify(themes.dark) !== JSON.stringify(localTheme)) {
          updateTheme("dark");
        }
      }
    } else {
      localStorage.setItem("theme", JSON.stringify(themes.light));
      setTheme(themes.light);
    }
  }, []);

  useLayoutEffect(() => {
    gsap.timeline().fromTo(
      ["#transition-right-plane", "#transition-right-thrust-gradient"],
      {
        x: -10000,
        duration:1.5,
        opacity: 0.7,
      },
      {
        x: 0,
        opacity: 1,
        duration:1.5,
      }
    );
  }, [transitionRight]);

  useLayoutEffect(() => {
    gsap.timeline().fromTo(
      ["#transition-left-plane", "#transition-left-thrust-gradient"],
      {
        x: 10000,
        duration:1.5,
        opacity: 0.7,
      },
      {
        x: 0,
        opacity: 1,
        duration:1.5,
      }
    );
  }, [transitionLeft]);

  useLayoutEffect(() => {
    if (!hideTransitionRight) return;
    gsap.timeline().fromTo(
      ["#transition-right-plane", "#transition-right-thrust-gradient"],
      {
        duration: 2,
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 2,
      }
    );
    setTimeout(() => {
      setTransitionRight(false);
      setHideTransitionRight(false);
    }, 2000);
  }, [hideTransitionRight]);

  useLayoutEffect(() => {
    if (!hideTransitionLeft) return;
    gsap.timeline().fromTo(
      ["#transition-left-plane", "#transition-left-thrust-gradient"],
      {
        duration: 2,
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 2,
      }
    );
    setTimeout(() => {
      setTransitionLeft(false);
      setHideTransitionLeft(false);
    }, 2000);
  }, [hideTransitionLeft]);

  const handleTransitionLeft = contextSafe((path: string) => {
    setTransitionLeft(true);
    setTimeout(() => {
      navigate(path);
      setHideTransitionLeft(true);
    }, 2000);
  });

  const handleTransitionRight = contextSafe((path: string) => {
    setTransitionRight(true);
    setTimeout(() => {
      navigate(path);
      setHideTransitionRight(true);
    }, 2000);
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyles />
        <Routes>
          <Route
            path=""
            element={<Landing handleRightTransition={handleTransitionRight} />}
          />
          <Route path="services" element={<MyServices />} />
        </Routes>
        <BottomNav
          handleLeftTransition={handleTransitionLeft}
          handleRightTransition={handleTransitionRight}
        />
        {transitionLeft && <TransitionLeftSvg />}
        {transitionRight && <TransitionRightSVG />}
      </div>
    </ThemeProvider>
  );
};

export default App;
