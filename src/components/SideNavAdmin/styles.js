import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.nav`
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${(props) => props.theme.black};
`;

export const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 40px 0;

    img {
        width: 60%;
    }
`;

export const NavLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;          
  box-sizing: border-box; 
  padding: 12px 20px;

  text-decoration: none;
  color: ${(props) => props.theme.white};

  background-color: ${(props) =>
    props.$isActive ? props.theme.purple : "transparent"};

  &:hover {
    background-color: ${(props) => props.theme.purple};
  }
`;

export const Footer = styled.footer`
    width: 100%;
    margin-top: auto;
`;

