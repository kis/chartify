import styled from 'styled-components';

export const Root = styled.div`
    margin: 0 auto;
    width: 1200px;
    max-width: 1200px;

    .container {
        width: 1000px;
        margin: 0 auto;
    }

    header {
        padding: 20px 0 0 0;   
    
        .project-title {
            margin: 0 auto;
            width: 650px;
            text-align: center;
            font-size: 1.5em;
            text-align: center;
            color: palevioletred;

            .main-header {
                font-size: 36px;
                margin: 0;
            }

            .sub-header {
                font-size: 16px;
                color: #3092e6;
                margin: 0;
            }
        }
    }

    footer {
        position: relative;

        .footer-text {
            font-size: 18px;
            margin: 20px 0;
            text-align: center;

            a {
                cursor: pointer;
                color: #447bff;
            }

            img {
                width: 25px;
                vertical-align: sub;
            }
        }
    }
`;

export const ForkGithub = styled.span`
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    width: 200px;
    overflow: hidden;
    height: 200px;
    z-index: 9999;

    .fork-link {
        background: #cc5739;
        color: #fff;
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        padding: 5px 40px;
        font-size: 1rem;
        line-height: 2rem;
        position: absolute;
        transition: 0.5s;
        width: 200px;
        top: 60px;
        right: -60px;
        transform: rotate(45deg);

        &:hover {
            background: #7d0505;
        }

        &::before,
        &::after {
            content: "";
            width: 100%;
            display: block;
            position: absolute;
            top: 1px;
            left: 0;
            height: 1px;
            background: #fff;
        }

        &::after {
            bottom: 1px;
            top: auto;
        }
    }
`;
