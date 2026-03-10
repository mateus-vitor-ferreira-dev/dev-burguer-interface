import styled from 'styled-components';


export const Container = styled.div`
    .carousel-item {
        padding-right: 40px;
    }

    padding-left: 40px;
`;

export const Title = styled.h2`
    font-size: 32px;
    color: ${(props) => props.theme.purple};
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    font-weight: 800;
    margin-bottom: 40px;
    margin-top: 20px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: calc(50% - 28px);
        width: 56px;
        height: 4px;
        background-color: ${(props) => props.theme.purple};
    }
`;

export const ContainerItems = styled.div`
    background: url('${(props) => props.$imageURL}') no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;

    display: flex;
    align-items: flex-end;      
    justify-content: flex-start; 

    padding: 20px 30px;  
    width: 100%;
    height: 250px;

`;

export const CategoryButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;

    color: ${(props) => (props.$isActiveCategory ? '#9758a6' : '#696969')};
    font-size: 24px;
    font-weight: 500;

    padding-bottom: 5px;
    line-height: 20px;

    border-bottom: ${(props) =>
        props.$isActiveCategory && '3px solid #9758a6'};
`;

