import styled from 'styled-components';

export const Loader = styled.div`
    position: relative;
    margin: 0 auto;
    background-size: 100px 100px;
    background-repeat: no-repeat;
    background-image: url(https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif);
    background-position: center center;
    z-index: 9999999;
    width: 100px;
    min-height: 230px;
`;

export const ChartBlock = styled.div`
    margin-bottom: 50px;

    .main-header {
        text-align: center;
        text-transform: uppercase;
        color: #447bff;
    }

    .total-info {
        text-align: center;
        margin: 10px 35px 30px;
    }
`;