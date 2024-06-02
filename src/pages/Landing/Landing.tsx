import { FC, useRef } from "react";
import LandingSvg from "../../svg/LandingSvg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button, Content, ContentWrapper } from "./styled";
import MovingCubes from "../../components/MovingCubes";

const Landing: FC<{ handleRightTransition: (path: string) => void }> = ({
  handleRightTransition,
}) => {
  const container = useRef();
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
          <Button onClick={() => handleRightTransition("services")}>
            Fly!
          </Button>
        </Content>
      </ContentWrapper>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <MovingCubes />
      </div>
      <LandingSvg />
    </>
  );
};

export default Landing;
