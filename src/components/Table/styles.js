import styled from 'styled-components';

export const Root = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 20px;
`;

export const Header = styled.thead``;

export const Tr = styled.tr``;

export const Th = styled.th`
    padding: 16px;
    text-align: left;
    background-color: #484848;
    border-bottom: 1px solid ${(props) => props.theme.lightGra};
    color: #fff;

    &:last-child{
        border-top-right-radius: 20px;
    }

    &:first-child{
        border-top-left-radius: 20px;
    }
`;

export const Td = styled.td`
    padding: 16px;
    background-color: #fff;
    font-weight: 500;
    line-height: 115%;
`;

export const Body = styled.tbody`
    
`;
