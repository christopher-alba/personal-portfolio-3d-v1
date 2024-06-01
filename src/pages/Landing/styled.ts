import styled from "styled-components";

export const ContentWrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  padding-left: 20vw;
  color: white;
  box-sizing: border-box;
`;

export const Content = styled.div`
  text-align: center;
  width: 350px;
`;

export const Button = styled.button`
  background: white;
  color: black;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 500ms;
  font-style: italic;
  &:hover {
    color: ${({ theme }) => theme.colors.tertiary1};
    -webkit-box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.7);
    -moz-box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.7);
  }`;
