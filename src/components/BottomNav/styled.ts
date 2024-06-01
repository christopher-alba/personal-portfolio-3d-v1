import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavWrapperMain = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
  padding: 5rem;
  z-index: 10;
  display: flex;
  justify-content: space-between;
`;

export const ArrowButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.tertiary1};
  &:hover {
    color: ${({ theme }) => theme.colors.tertiary1Hover};
  }
`;

export const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 5rem;
`;
export const FontAwesomeIconStyledMini = styled(FontAwesomeIcon)`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  height: 6rem;
  width: 6rem;
  aspect-ratio: 1/1;
  margin: 10px;
  background: ${({ theme }) => theme.colors.tertiary1};
  color: white;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: 500ms;
  border-radius: 10px;
  &:hover {
    background: ${({ theme }) => theme.colors.tertiary1Hover};
  }
`;
