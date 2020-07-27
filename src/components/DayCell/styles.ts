import styled from 'styled-components';

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
        background-color: rgba(255, 255, 255, 0.5);
        color: #e36463;
    }

    header {
        display: inline-flex;
        text-align: left;
        justify-content: space-between;
    }
`;
export const Button = styled.button`
    height: 32px;
    width: 32px;
    border: 0;
    color: #e36463;
    border: 1px solid #e36463;
    opacity: 0;
    outline: none;
    display: block;

    &:active {
        background-color: #e36463;
        color: white;
    }

    ${Container}:hover & {
        display: block;
        opacity: 1;
    }
`;

export const ReminderDot = styled.div`
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
