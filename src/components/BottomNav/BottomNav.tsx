import { FC, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowButton,
  Button,
  ButtonsWrapper,
  FontAwesomeIconStyled,
  FontAwesomeIconStyledMini,
  NavWrapperMain,
} from "./styled";
import {
  faAnglesLeft,
  faAnglesRight,
  faUser,
  faBriefcase,
  faCode,
  faPaintBrush,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const BottomNav: FC<{
  handleLeftTransition: (path: string) => void;
  handleRightTransition: (path: string) => void;
}> = ({ handleLeftTransition, handleRightTransition }) => {
  const location = useLocation();
  const [transition, setTransition] = useState(false);

  useLayoutEffect(() => {
    if (transition) {
      gsap.to("#nav-wrapper-main", {
        opacity: 0,
        duration: 0.2,
      });
    }
  }, [transition]);
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  useGSAP(() => {
    gsap.fromTo(
      "#nav-wrapper-main",
      {
        opacity: 0,
        duration: 0.5,
      },
      {
        opacity: 1,
        duration: 0.5,
      }
    );
  }, [location]);
  const handleTransition = contextSafe(() => {
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
    }, 2000);
  });

  const handleButtonLinkClicked = (path: string) => {
    switch (location.pathname) {
      case "/services":
        handleRightTransition(path);

        break;
      case "/career":
        if (path === "services") {
          handleLeftTransition(path);
        } else {
          handleRightTransition(path);
        }
        break;
      case "/technology":
        if (path === "services" || path === "career") {
          handleLeftTransition(path);
        } else {
          handleRightTransition(path);
        }
        break;
      case "/projects":
        if (path === "education") {
          handleRightTransition(path);
        } else {
          handleLeftTransition(path);
        }
        break;
      case "/education":
        handleLeftTransition(path);
        break;
      default:
        break;
    }
    handleTransition();
  };

  const calculatePath = (direction: string) => {
    switch (location.pathname) {
      case "/services":
        if (direction === "left") {
          return "";
        } else {
          return "career";
        }
      case "/career":
        if (direction === "left") {
          return "services";
        } else {
          return "technology";
        }
      case "/technology":
        if (direction === "left") {
          return "career";
        } else {
          return "projects";
        }
      case "/projects":
        if (direction === "left") {
          return "technology";
        } else {
          return "education";
        }
      case "/education":
        if (direction === "left") {
          return "projects";
        } else {
          return "services";
        }

      default:
        break;
    }

    return "";
  };

  return (
    <NavWrapperMain
      id="nav-wrapper-main"
      ref={container as any}
      style={{ display: location.pathname === "/" ? "none" : "flex" }}
    >
      <ArrowButton
        onClick={() => {
          handleLeftTransition(calculatePath("left"));
          handleTransition();
        }}
      >
        <FontAwesomeIconStyled icon={faAnglesLeft} />
      </ArrowButton>
      <ButtonsWrapper>
        <Button onClick={() => handleButtonLinkClicked("services")}>
          <FontAwesomeIconStyledMini icon={faUser} />
          Services
        </Button>
        <Button onClick={() => handleButtonLinkClicked("career")}>
          <FontAwesomeIconStyledMini icon={faBriefcase} />
          Career
        </Button>
        <Button onClick={() => handleButtonLinkClicked("technology")}>
          <FontAwesomeIconStyledMini icon={faCode} />
          Technology
        </Button>
        <Button onClick={() => handleButtonLinkClicked("projects")}>
          <FontAwesomeIconStyledMini icon={faPaintBrush} />
          Projects
        </Button>
        <Button onClick={() => handleButtonLinkClicked("education")}>
          <FontAwesomeIconStyledMini icon={faGraduationCap} />
          Education
        </Button>
      </ButtonsWrapper>
      <ArrowButton
        onClick={() => {
          handleRightTransition(calculatePath("right"));
          handleTransition();
        }}
      >
        <FontAwesomeIconStyled icon={faAnglesRight} />
      </ArrowButton>
    </NavWrapperMain>
  );
};

export default BottomNav;
