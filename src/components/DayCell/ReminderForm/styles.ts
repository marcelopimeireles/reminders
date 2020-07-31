import styled from 'styled-components';
import { FormData } from './index';

export const Container = styled.div``;
export const ColorPicker = styled.div`
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
    width: 25%;
    .label {
        margin-left: 8px;
        display: flex;
        width: 100%;
    }
`;
export const RadioInput = styled.input.attrs((props: FormData) => ({
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
        height: 25px;
        width: 25px;
        background-color: ${(props) => props.color};

        &:after {
            content: '';
            position: absolute;
            display: none;
            top: 9px;
            left: 9px;
            width: 8px;
            height: 8px;
            background: ${(props) => props.color};
        }
    }
    &:checked + .checkmark {
        background-color: ${(props) => props.reminder.color};
        &:after {
            display: inline-flex;
        }
    }
`;
export const TimePicker = styled.select``;
export const Text = styled.div`
    display: inline-flex;
    margin-left: 8px;
    vertical-align: text-bottom;
`;
