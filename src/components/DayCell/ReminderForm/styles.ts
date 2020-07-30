import styled from 'styled-components';
import { FormData } from './index';

export const Container = styled.div``;
export const ColorPicker = styled.div``;
export const Radio = styled.div``;
export const RadioInput = styled.input.attrs((props: FormData) => ({
    type: 'radio',
    name: 'action',
    value: props.color,
}))``;
