import React, { useState, useContext } from 'react';

import { v1 as uuidV1 } from 'uuid';
import { format } from 'date-fns';

import { CalendarCtx } from '../../CalendarProvider';

import { reminderType } from '../Reminder';

import { Container, Textarea, ColorPicker, Radio, RadioInput, TimePicker, Text, SaveButton } from './styles';

const ReminderForm: React.FC = () => {
    const { reminders, setReminders } = useContext(CalendarCtx);
    const { togglePopOver, setTogglePopOver } = useContext(CalendarCtx);
    const { todayKey } = useContext(CalendarCtx);
    const { currentId } = useContext(CalendarCtx);
    const { colors, hours } = useContext(CalendarCtx);
    const [color, setColor] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const [id] = useState<string>(uuidV1());

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log({ color, description, dateTime, id });

        if (description && dateTime && color) {
            if (currentId === id) {
                // saveEdit
            } else {
                // saveNew
                const data: reminderType = { color, description, dateTime, id };
                const result: reminderType[] = [...reminders].concat(data);
                setReminders && setReminders(result);
            }
        }
        setTogglePopOver && setTogglePopOver(!togglePopOver);
    }

    function changeHour(e: any = null) {
        e.preventDefault();
        const hourArray: string[] = e ? e.target.value.split(':') : hours && hours[0].split(':');
        let result = Number(hourArray[0]);
        let date: Date;
        if (hourArray.length > 0 && hourArray[1].indexOf('PM') !== -1) {
            result = result + 12;
        }
        const prefix = result < 10 ? '0' : '';
        if (todayKey) {
            date = new Date(`${todayKey}T${prefix}${result}:00:00Z`);
        } else {
            date = new Date(`${format(new Date(), 'yyyy-MM-dd')}T${prefix}${result}:00:00Z`);
        }
        setDateTime(date);
        return date;
    }

    return (
        <Container>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Textarea
                    name="description"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />

                <TimePicker name="dateTime" onChange={(e) => changeHour(e)}>
                    {hours &&
                        hours.map((hour, index) => (
                            <option key={index} value={hour}>
                                {hour}
                            </option>
                        ))}
                </TimePicker>
                <ColorPicker>
                    {colors &&
                        colors.map((color, index) => {
                            return (
                                <Radio key={color + index}>
                                    <label style={{ width: '100%' }} onChange={() => setColor(color)}>
                                        <RadioInput color={color} />
                                        <div className="checkmark" />
                                        <Text>{color}</Text>
                                    </label>
                                </Radio>
                            );
                        })}
                </ColorPicker>

                <SaveButton className="btn-submit">Salvar</SaveButton>
            </form>
        </Container>
    );
};

export default ReminderForm;
