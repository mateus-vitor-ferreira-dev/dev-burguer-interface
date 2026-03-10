import styled from 'styled-components';

export const ProductImage = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 16px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    font-weight: 500;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
        color: #fff;
        border-radius: 4px;
        background-color: ${(props) => props.theme.purple};
        transition: all 0.4s ease;
        border: none;

        &:hover {
            background-color: #6f356c;
        }
    }
`;

export const EmptyCart = styled.p`
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`;

export const ProductTotalPrice = styled.p`
    font-weight: bold;
`;

export const TrashImage = styled.img`
    height: 20px;
    width: 20px;
    cursor: pointer;
    transition: all 0.4s ease;
    
    &:hover {
        filter: brightness(0.8);
    }
`;