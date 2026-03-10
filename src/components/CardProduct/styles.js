import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
  padding: 20px;

  border-radius: 12px;
  background: #fff;

  box-shadow: 0 8px 20px rgba(0,0,0,0.08);

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.12);
  }

  div {
    width: 100%;
    text-align: center;

    p {
      font-size: 16px;
      color: #ff8505;
      font-weight: 700;
      line-height: 20px;
      margin-bottom: 5px;
    }

    strong {
      font-size: 20px;
      color: ${(props) => props.theme.secondBlack};
      font-weight: 800;
    }
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardImage = styled.img`
    height: 100px;
    position: absolute;
    top: -50px;
    overflow: visible;
    pointer-events: none;
`;

