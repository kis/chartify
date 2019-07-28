import styled from 'styled-components';

export const DatasetsMenu = styled.ul`
    text-align: center;
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
`;

export const MenuLink = styled.li`
    background: transparent;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    padding: 20px 10px;

    a {
        border: 2px solid #447bff;
        padding: 8px 28px;
        color: #447bff;
        font-weight: bold;
        text-decoration: none;
    }
`;