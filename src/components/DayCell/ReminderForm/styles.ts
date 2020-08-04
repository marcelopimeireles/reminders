import styled from 'styled-components';
import { reminderType } from '../Reminder';

export const Container = styled.div`
    text-align: left;
`;

export const Row = styled.div`
    display: flex;
    box-direction: row;
`;

export const Textarea = styled.textarea`
    width: calc(100% - 16px);
    border: 0;
    background-color: white;
    resize: none;
    height: 80px;
    margin: 4px 0 0 0;
    font-size: 16px;
    padding: 8px;
    font-family: Helvetica, Arial, sans-serif;
`;

export const TimePicker = styled.select`
    margin: 4px 0 0 0;
    height: 40px;
    padding: 8px;
`;

export const ColorPicker = styled.div`
    margin: 8px 0 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    position: relative;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    user-select: none;
    &:hover {
        input {
            background-color: #ccc;
        }
    }
`;
export const Radio = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    > .label {
        width: 100%;
    }
`;
export const RadioInput = styled.input.attrs((props: reminderType) => ({
    type: 'radio',
    name: 'color',
    id: props.color,
    value: props.color,
}))`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    & + .checkmark {
        display: inline-flex;
        position: relative;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #ccc;

        &:after {
            content: '';
            position: absolute;
            display: none;
            top: 4px;
            left: 0;
            width: 4px;
            height: 4px;
            background: #ccc;
        }
    }
    &:checked + .checkmark {
        background-color: ${(props) => props.color};
        &:after {
            display: inline-flex;
            background: ${(props) => props.color};
        }
    }
`;

export const Text = styled.div`
    display: inline-flex;
    margin-left: 4px;
    vertical-align: text-bottom;
    font-size: 14px;
    color: #666;
`;

export const SaveButton = styled.button`
    font-size: 18px;
    font-weight: 600;
    background-color: #00cc00;
    align-self: flex-end;
    padding: 8px 16px;
    color: white;
    border: 0;
    margin: 8px 0px 16px calc(100% - 90px);
    &:hover {
        background-color: #00b300;
        transition: background-color 200ms linear;
    }
`;
