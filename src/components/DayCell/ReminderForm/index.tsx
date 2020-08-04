import React, { useState, useContext, useEffect } from 'react';

import { v1 as uuidV1 } from 'uuid';
import { format } from 'date-fns';
import { Dictionary, groupBy } from 'lodash';

import { CalendarCtx, CalendarContextInterface } from '../../CalendarProvider';

import { reminderType } from '../Reminder';

import { Container, Textarea, ColorPicker, Radio, RadioInput, TimePicker, Text, SaveButton } from './styles';

const ReminderForm: React.FC = () => {
    const { togglePopOver, setTogglePopOver } = useContext<CalendarContextInterface>(CalendarCtx);
    const { reminders, setReminders } = useContext<CalendarContextInterface>(CalendarCtx);
    const { remindersList, setRemindersList } = useContext<CalendarContextInterface>(CalendarCtx);

    const { today } = useContext<CalendarContextInterface>(CalendarCtx);
    const { currentId } = useContext<CalendarContextInterface>(CalendarCtx);
    const { colors, hours } = useContext<CalendarContextInterface>(CalendarCtx);

    const [localColor, setLocalColor] = useState<string>('');
    const [localDescription, setLocalDescription] = useState<string>('');
    const [localDate, setLocalDate] = useState<string>('');
    const [localTime, setLocalTime] = useState<string>('');
    const [localId, seLocaltId] = useState<string>(uuidV1());

    function handleSubmit(e: any) {
        e.preventDefault();
        e.stopPropagation();
        (async () => {
            buildReminders();
        })();
        setTogglePopOver && setTogglePopOver(!togglePopOver);
    }

    function buildReminders() {
        let result: reminderType[] = [];

        if (reminders) {
            result = [...reminders];
        }

        console.log(localDescription, localDate, localTime, localColor);
        if (localDescription && localDate && localTime && localColor) {
            const data: reminderType = {
                id: currentId,
                description: localDescription,
                date: localDate,
                time: localTime,
                color: localColor,
            };

            if (currentId === localId) {
                // saveEdit
                console.log('saveEdit');
                return result;
            } else {
                // saveNew
                console.log('saveNew');
                data.id = localId;
                result = [...result].concat(data);
                console.log(result);
                setReminders && setReminders(result);
            }
        }
    }

    function resetLocalValues() {
        setLocalDescription('');
        setLocalDate('');
        setLocalTime('');
        setLocalColor('');
    }

    function buildRemindersList() {
        const newList: Dictionary<reminderType[]> = groupBy(reminders, 'date');
        return newList;
        // setRemindersList ? setRemindersList(newList) : null;
    }

    function changeHour(e: any = null) {
        console.log('change: ', e.target.value);
        e.preventDefault();
        const hourArray: string[] = e ? e.target.value.split(':') : hours && hours[0].split(':');
        let result = Number(hourArray[0]);
        let date: Date;
        if (hourArray.length > 0 && hourArray[1].indexOf('PM') !== -1) {
            result = result + 12;
        }
        const prefix = ('0' + result.toString()).slice(-2);
        console.log(prefix);

        (async () => {
            if (today) {
                date = new Date(`${today}T${prefix}:00:00Z`);
            } else {
                date = new Date(`${format(new Date(), 'yyyy-MM-dd')}T${prefix}:00:00Z`);
            }
            console.log(`${today}T${prefix}:00:00Z`);
            setLocalDate(format(new Date(date), 'yyyy-MM-dd'));
            setLocalTime(prefix);
        })();
    }

    useEffect(() => {
        if (togglePopOver === true) return;
        (async () => {
            buildReminders();
            if (reminders?.length === 0) return;
            setRemindersList && setRemindersList(buildRemindersList());
            console.log(reminders);
            resetLocalValues();
        })();
    }, [togglePopOver]);

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Textarea
                    name="description"
                    placeholder="Description"
                    onChange={(e) => setLocalDescription(e.currentTarget.value)}
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
                                    <label style={{ width: '100%' }} onChange={() => setLocalColor(color)}>
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
