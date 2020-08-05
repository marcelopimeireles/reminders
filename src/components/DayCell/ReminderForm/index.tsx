import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';

import { v1 as uuidV1 } from 'uuid';
import format from 'date-fns/format';
import { Dictionary, map, filter, groupBy, isEmpty } from 'lodash';

import { CalendarCtx, CalendarContextInterface } from '../../CalendarProvider';

import { reminderType } from '../Reminder';

import { Container, Textarea, ColorPicker, Radio, RadioInput, TimePicker, Text, SaveButton } from './styles';

const ReminderForm: React.FC = () => {
    const { togglePopOver, setTogglePopOver } = useContext<CalendarContextInterface>(CalendarCtx);
    const { reminders, setReminders } = useContext<CalendarContextInterface>(CalendarCtx);
    const { setRemindersList } = useContext<CalendarContextInterface>(CalendarCtx);

    const { today } = useContext<CalendarContextInterface>(CalendarCtx);
    const { currentId, setCurrentId } = useContext<CalendarContextInterface>(CalendarCtx);
    const { colors, hours } = useContext<CalendarContextInterface>(CalendarCtx);

    const [localColor, setLocalColor] = useState<string>('');
    const [localDescription, setLocalDescription] = useState<string>('');
    const [localDate, setLocalDate] = useState<string>('');
    const [localTime, setLocalTime] = useState<string>('');
    const [localId, setLocalId] = useState<string>(uuidV1());
    const [disabled, setDisabled] = useState<boolean>(true);

    type initHour = {
        preventDefault: () => void;
        target: { value: string | undefined };
    };

    const initHour: initHour = {
        preventDefault: () => {
            return;
        },
        target: { value: '' },
    };

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setTogglePopOver && setTogglePopOver(!togglePopOver);
    }

    function isSubmitDisabled() {
        if (isEmpty(localTime) || isEmpty(localDate) || isEmpty(localDescription) || isEmpty(localColor)) {
            setDisabled(true);
            console.log('setDisabled', true);
        } else {
            setDisabled(false);
            console.log('setDisabled', false);
        }
    }

    function buildReminders() {
        let result: reminderType[] = [];

        if (reminders) {
            result = [...reminders];
        }

        if (localDescription && localDate && localTime && localColor) {
            const data: reminderType = {
                id: currentId,
                description: localDescription,
                date: localDate,
                time: localTime,
                color: localColor,
            };

            if (currentId && currentId === localId) {
                console.log('saveEdit');
                result = map(result, (reminder) => (reminder.id === localId ? data : reminder));
                return result;
            } else {
                console.log('saveNew');
                data.id = localId;
                result = [...result].concat(data);
            }
        }
        return result;
    }

    function resetLocalValues() {
        setLocalId('');
        setLocalDescription('');
        setLocalDate('');
        setLocalColor('');
    }

    function buildRemindersList(localReminders: reminderType[]) {
        const newList: Dictionary<reminderType[]> = groupBy(localReminders, 'date');
        return newList;
    }

    function changeHour(e: ChangeEvent<HTMLSelectElement> | initHour = initHour) {
        e.preventDefault();
        const hourArray: string[] | undefined = e.target.value?.split(':');
        let result = hourArray && Number(hourArray[0]);
        let date: Date;
        if (hourArray && hourArray.length > 0 && hourArray[1].indexOf('PM') !== -1) {
            result = Number(result) + 12;
        }
        const prefix = ('0' + result?.toString()).slice(-2);

        (async () => {
            if (today) {
                date = new Date(`${today}T${prefix}:00:00Z`);
            } else {
                date = new Date(`${format(new Date(), 'yyyy-MM-dd')}T${prefix}:00:00Z`);
            }
            setLocalDate(format(new Date(date), 'yyyy-MM-dd'));
            setLocalTime(prefix);
        })();
    }

    function loadReminderById(id: string) {
        const data: reminderType[] = filter(reminders, (reminder) => reminder.id === id);
        const firstData = data[0];
        firstData.description && setLocalDescription(firstData.description);
        firstData.date && setLocalDate(firstData.date);
        firstData.time && setLocalTime(firstData.time);
        firstData.color && setLocalColor(firstData.color);
    }

    useEffect(() => {
        if (togglePopOver === true && isEmpty(currentId)) {
            resetLocalValues();
            setLocalId(uuidV1());
            return;
        }

        (async () => {
            if (togglePopOver === false) {
                const localReminders = await buildReminders();
                setReminders && setReminders(localReminders);
                setRemindersList && setRemindersList(buildRemindersList(localReminders));
                setCurrentId && setCurrentId('');
                resetLocalValues();
            } else {
                currentId && setLocalId(currentId);
                loadReminderById(localId);
            }
        })();
    }, [togglePopOver]);

    useEffect(() => {
        if (hours) {
            initHour.target.value = hours[0];
            changeHour(initHour);
        }
    }, [hours]);

    useEffect(() => {
        isSubmitDisabled();
    }, [localDate, localTime, localColor, localDescription]);

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Textarea
                    name="description"
                    placeholder="Description"
                    onChange={(e) => setLocalDescription(e.currentTarget.value)}
                />

                <ColorPicker>
                    <TimePicker name="dateTime" onChange={(e) => changeHour(e)}>
                        {hours &&
                            hours.map((hour, index) => (
                                <option key={index} value={hour}>
                                    {hour}
                                </option>
                            ))}
                    </TimePicker>
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

                <SaveButton className="btn-submit" disabled={disabled}>
                    Salvar
                </SaveButton>
            </form>
        </Container>
    );
};

export default ReminderForm;
