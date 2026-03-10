import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";

import BackgroundLogin from "../../assets/BackgroundLogin.png";
import Background from "../../assets/Background.png";


export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;

export const LeftContainer = styled.div`
    background: url('${BackgroundLogin}');
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    max-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 80%;
    }
`;

export const RightContainer = styled.div`
    background: url('${Background}');
    background-size: cover;
    background-position: center;
    background-color: #1e1e1e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 50%;
    height: 100%;

    p {
        color: #fff;
        font-size: 18px;
        font-weight: 800;
        
        a {
            text-decoration: underline;
        }

    }
`;

export const Title = styled.h2`
    font-family: 'Road Rage', sans-serif;
    font-size: 40px;
    color: ${(props) => props.theme.purple}
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    gap: 20px;
    padding: 20px;  
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    label {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
    }

    input {
        width: 100%;
        border: none;
        height: 52px;
        border-radius: 5px;
        padding: 0 16px;
    }

    p {
        font-size: 14px;
        line-height: 80%;
        color: #cf3057;
        font-weight: 600;
        height: 10px;
    }
`;

export const Link = styled(ReactLink)`
    text-decoration: none;
    color: #fff;
`;
