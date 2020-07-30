import React, { useState, useRef } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { reminderType } from '../Reminder';

// import ReactTimePicker from 'react-ts-timepicker';
import { Container, ColorPicker, Radio, RadioInput } from './styles';

type ReminderFormProps = {
    reminder: reminderType | null | undefined;
    handleCreateUpdateReminder?: () => null;
    handleSetEditDay?: () => null;
};

export interface FormData {
    time: Date | null | undefined;
    description: string | null | undefined;
    color: string | null | undefined;
}

const ReminderForm: React.FC<ReminderFormProps> = (props: ReminderFormProps) => {
    const [time, setTime] = useState('10:00');
    const colors = ['red', 'blue', 'green', 'black'];

    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<FormData> = (reminder: FormData) => {
        console.log(formRef);
    };

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <textarea name="description" placeholder="Reminder" />

                {/* <ReactTimePicker value={time} /> */}

                <ColorPicker>
                    {colors.map((color, index) => {
                        <Radio key={color + index}>
                            <label>
                                <RadioInput name="color" value={color} checked={index === 0} />
                                {color}
                            </label>
                        </Radio>;
                    })}
                </ColorPicker>

                <button className="btn-submit">Salvar</button>

                <button className="btn-cancel" onClick={() => null}>
                    Cancel
                </button>
            </Form>
        </Container>
    );
};

export default ReminderForm;
