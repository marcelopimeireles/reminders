import styled, { StyledComponent } from 'styled-components';

import { FormData } from './ReminderForm/index';

interface IPopOver {
    toggled: boolean;
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.25);
    margin: 2px;
    padding: 6px;
    color: rgb(0, 0, 0, 0.125);
    font-weight: 600;
    font-size: 1.5em;
    text-align: center;
    flex: 1 0 0px;
    min-width: 1.5em;
    justify-items: stretch;
    min-height: 10vh;
    box-sizing: border-box;

    &:hover {
        background-color: rgba(255, 255, 255, 0.75);
        color: #e36463;
        transition: background-color 200ms linear;
    }

    header {
        display: inline-flex;
        text-align: left;
        justify-content: space-between;
    }
`;

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

    ${Container}:hover & {
        display: block;
        opacity: 1;
        transition: opacity 400ms linear;
    }

    &:hover {
        & > svg {
            transform: scale(1.5);
            transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
        }
    }
`;

export const ReminderDot = styled.button.attrs((props: FormData) => ({
    id: props.id,
    color: props.color,
}))`
    display: inline-block;
    margin: 8px 8px 0 8px;
    padding: 0;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    box-sizing: border-box;

    &:hover {
        margin: 8px 8px 0 8px;
        border: 1px solid rgba(255, 255, 255, 0.75);
        box-shadow: 0 0 5px ${(props) => props.color};
    }
`;

export const PopOver = styled.div<IPopOver>`
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
