import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const ProductImage = styled.img`
  padding: 12px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

export const EditButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: ${(props) => props.theme.purple};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: white;
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${(props) => props.theme.darkPurple};
  }
`;

export const ContainerButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;