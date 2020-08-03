import styled, { StyledComponent } from 'styled-components';

interface IPopOver {
    toggled: boolean;
}

export const Close = styled.button`
    border: 0;
    background: 0;
    height: 32px;
    width: 32px;
    outline: 0;

    &:hover {
        & > svg {
            transform: scale(1.5);
            transition: transform 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
        }
    }
`;

export const Button = styled.button`
    display: block;
    border: 0;
    height: 32px;
    width: 32px;
    color: #e36463;
    border: 1px solid #e36463;
    opacity: 0;
    outline: none;

    &:active {
        background-color: #e36463;
        color: white;
    }

    &:hover {
        & > svg {
            transform: scale(1.5);
            transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
        }
    }
`;

export const Container = styled.div<IPopOver>`
    padding: 8px;
    display: ${(props) => (props.toggled ? 'block' : 'none')};
    min-height: 20vh;
    height: auto;
    overflow: auto;
    background-color: rgba(255, 255, 255, 1);

    position: fixed;
    content: '';
    top: 25vh;
    left: 20%;
    width: 60%;

    &:before {
        background-color: rgba(0, 0, 0, 0.1);
        width: 100vw;
        height: 100vh;
        z-index: -100;
        position: fixed;
        content: '';
        top: 0;
        left: 0;
    }
    &:after {
        background-color: rgba(255, 255, 255, 1);
        width: 60%;
        height: 50vh;
        z-index: 100;
    }

    header {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        h1 {
            color: #666;
            font-weight: 600;
            margin: 0 0 8px 0;
        }
    }
`;
