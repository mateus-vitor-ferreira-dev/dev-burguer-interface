import styled from "styled-components";

export const ContainerBackButton = styled.button`
  position: absolute;
  top: 40px;
  left: 40px;

  border: none;

  color: ${(props) =>
    props.$isActive ? "${(props) => props.theme.purple}" : "#fff"};

  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 500;

  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;

  background: ${(props) =>
    props.$isActive
      ? "rgba(151, 88, 166, 0.2)"
      : "rgba(255, 255, 255, 0.08)"};

  backdrop-filter: blur(6px);
  padding: 8px 14px;
  border-radius: 20px;

  transition: color 0.3s ease, background 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: ${(props) =>
      props.$isActive
        ? "rgba(151, 88, 166, 0.25)"
        : "rgba(255, 255, 255, 0.15)"};
  }

  &:hover svg {
    transform: translateX(-4px);
  }
`;