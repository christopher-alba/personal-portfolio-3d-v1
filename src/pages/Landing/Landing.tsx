import { FC, useLayoutEffect, useRef, useState } from "react";
import LandingSvg from "../../svg/LandingSvg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button, Content, ContentWrapper } from "./styled";
import TransitionRightSVG from "../../svg/TransitionRightSvg";
import { useNavigate } from "react-router-dom";

const Landing: FC = () => {
  const container = useRef();
  const [transition, setTransition] = useState(false);
  const { contextSafe } = useGSAP({ scope: container });
  const navigate = useNavigate();
  useGSAP(() => {
    gsap
      .timeline()
      .from(["#plane"], { x: -3000, duration: 1 })
      .to("#plane", {
        x: (x) => x - 10,
        yoyo: true,
        yoyoEase: "none",
        duration: 1,
        repeat: -1,
      });
    gsap
      .timeline()
      .from(["#thrust-gradient"], { x: -3000, duration: 1, opacity: 0 })
      .to(["#thrust-gradient"], {
        opacity: 0.7,
        x: (x) => x - 10,
        yoyo: true,
        yoyoEase: "none",
        duration: 1,
        repeat: -1,
      });

    gsap
      .timeline()
      .fromTo(
        "#particle",
        {
          scale: 0,
          stagger: 0.01,
          delay: 0.5,
          rotation: () => gsap.utils.random(-360, 360),
          duration: 2,
          opacity: 0,
        },
        {
          scale: () => gsap.utils.random(0.2, 2),
          stagger: 0.01,
          rotation: () => gsap.utils.random(-360, 360),
          duration: () => gsap.utils.random(0.5, 2),
          opacity: () => gsap.utils.random(0.2, 1),
        }
      )
      .to("#particle", {
        y: () => gsap.utils.random(-5, 5),
        x: () => gsap.utils.random(-5, 5),
        opacity: () => gsap.utils.random(0.2, 1),
        yoyo: true,
        repeat: -1,
        yoyoEase: "none",
      });
    gsap.from("#landing-content", {
      opacity: 0,
      delay: 1,
      duration: 1,
    });
  });

  const handlePageTransitionRight = contextSafe(() => {
    setTransition(true);
    setTimeout(() => {
      navigate("services");
    }, 2000);
  });

  useLayoutEffect(() => {
    gsap
      .timeline()
      .from(["#transition-right-plane", "#transition-right-thrust-gradient"], {
        x: -10000,
        duration: 2,
        opacity: 0.7,
      })
      .fromTo(
        "#transition-right-particle",
        {
          opacity: 0,
        },
        {
          opacity: 0,
        }
      );
  }, [transition]);

  return (
    <>
      <ContentWrapper ref={container as any}>
        <Content id="landing-content">
          <p style={{ margin: 0 }}>Hi there!</p>
          <h1 style={{ margin: 0, fontWeight: 200 }}>
            I'm <span style={{ fontWeight: 700 }}>Christopher Alba.</span>
          </h1>
          <hr />
          <h3 style={{ margin: "20px 0" }}>
            This is my online portfolio / website.
          </h3>
          <Button onClick={handlePageTransitionRight}>Fly!</Button>
        </Content>
      </ContentWrapper>
      <LandingSvg />
      {transition && <TransitionRightSVG />}
    </>
  );
};

export default Landing;
