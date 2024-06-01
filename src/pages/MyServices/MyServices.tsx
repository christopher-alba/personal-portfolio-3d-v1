import { FC } from "react";
import { StyledContainer } from "./styled";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MyServices: FC = () => {
  useGSAP(() => {
    gsap.fromTo(
      "#services-container",
      {
        opacity: 0,
        duration: 1.5,
      },
      {
        opacity: 1,
        duration: 1.5,
      }
    );
  },[]);
  return (
    <StyledContainer id="services-container">
      <h1>Services I Provide.</h1>
      <p>
        I am able to work in a full-stack environment. From traditional to
        cloud, monolith to microservices. From vanilla JavaScript, HTML, CSS, to
        fully fledged frontend frameworks like React. I will be an asset to your
        company and can contribute to your codebase within the first week.
      </p>
      <p>
        I can build simple websites on my own, freelance if needed. I will
        handle everything from design, construction, deployment, and getting
        your website on Google. Simple websites include SPA marketing websites,
        websites with simple monolith backend architecture and a SPA frontend,
        or a vanilla HTML, JS, and CSS website. *terms and conditions apply.
      </p>
    </StyledContainer>
  );
};

export default MyServices;
