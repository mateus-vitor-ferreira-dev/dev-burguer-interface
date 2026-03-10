import styled from "styled-components";
import Select from 'react-select';

export const ContentContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

export const ProductImage = styled.img`
  width: 72px;
  height: 72px;

  object-fit: cover;
  border-radius: 16px;

  display: block;
  margin: auto;
`;

export const SelectStatus = styled(Select)`
    width: 240px;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 28px 0;
  flex-wrap: wrap;
`;

export const FilterOption = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${(props) => 
    props.$isActiveStatus ? props.theme.purple : props.theme.darkGray};
  border-bottom: ${(props) => 
    props.$isActiveStatus ? `2px solid ${props.theme.purple}` : 'none'};
  font-size: 18px;
  line-height: 28px;
  padding-bottom: 5px;
`;
