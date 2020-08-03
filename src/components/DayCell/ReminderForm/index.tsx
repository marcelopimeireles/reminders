import React, { useState, useRef, useContext } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { reminderType } from '../Reminder';

import { Container, Row, Textarea, ColorPicker, Radio, RadioInput, TimePicker, Text, SaveButton } from './styles';

type ReminderFormProps = {
    reminder: reminderType | null | undefined;
    handleCreateUpdateReminder?: () => null;
    handleSetEditDay?: () => null;
};

export interface FormData {
    id?: string;
    timeDate?: Date | null;
    description?: string | null;
    color?: string | null;
}

const ReminderForm: React.FC<ReminderFormProps> = (props: ReminderFormProps) => {
    const [time, setTime] = useState('10 : 00 AM');
    const colors = ['red', 'blue', 'green', 'black'];
    const hours = [
        '01:00 AM',
        '02:00 AM',
        '03:00 AM',
        '04:00 AM',
        '05:00 AM',
        '06:00 AM',
        '07:00 AM',
        '08:00 AM',
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
        '06:00 PM',
        '07:00 PM',
        '08:00 PM',
        '09:00 PM',
        '10:00 PM',
        '11:00 PM',
        '12:00 PM',
    ];

    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<FormData> = (reminder: FormData) => {
        console.log(formRef);
    };

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Textarea name="description" placeholder="Description" />

                <TimePicker name="time">
                    {hours.map((hour, index) => (
                        <option key={index} value={hour}>
                            {hour}
                        </option>
                    ))}
                </TimePicker>
                <ColorPicker>
                    {colors.map((color, index) => {
                        return (
                            <Radio key={color + index}>
                                <label style={{ width: '100%' }}>
                                    <RadioInput color={color} />
                                    <div className="checkmark" />
                                    <Text>{color}</Text>
                                </label>
                            </Radio>
                        );
                    })}
                </ColorPicker>

                <SaveButton className="btn-submit">Salvar</SaveButton>
            </Form>
        </Container>
    );
};

export default ReminderForm;
