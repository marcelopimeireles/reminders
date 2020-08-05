import React, { useState, useContext, useEffect, ChangeEvent, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';

import { v1 as uuidV1 } from 'uuid';
import format from 'date-fns/format';
import { Dictionary, map, groupBy, isEmpty, remove } from 'lodash';

import { CalendarCtx, CalendarContextInterface } from '../../CalendarProvider';

import { reminderType } from '../Reminder';

import { Container, Textarea, ColorPicker, Radio, RadioInput, TimePicker, Text, SaveButton, Button } from './styles';

const ReminderForm: React.FC = () => {
    const { togglePopOver, setTogglePopOver } = useContext<CalendarContextInterface>(CalendarCtx);
    const { reminders, setReminders } = useContext<CalendarContextInterface>(CalendarCtx);
    const { remindersList, setRemindersList } = useContext<CalendarContextInterface>(CalendarCtx);

    const { today } = useContext<CalendarContextInterface>(CalendarCtx);
    const { currentId, setCurrentId } = useContext<CalendarContextInterface>(CalendarCtx);
    const { colors, hours } = useContext<CalendarContextInterface>(CalendarCtx);

    const [localColor, setLocalColor] = useState<string>('');
    const [localDescription, setLocalDescription] = useState<string>('');
    const [localDate, setLocalDate] = useState<string>('');
    const [localTime, setLocalTime] = useState<string>('');
    const [localId, setLocalId] = useState<string>('');
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
        } else {
            setDisabled(false);
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

            if (currentId && isEmpty(localId)) return buildDelete();

            if (currentId && currentId === localId) {
                result = map(result, (reminder) => (reminder.id === localId ? data : reminder));
                return result;
            } else {
                data.id = uuidV1();
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

    function loadReminderById() {
        const data: reminderType[] = reminders ? reminders.filter((reminder) => reminder.id === currentId) : [];
        const firstData = data[0];
        firstData?.id && setLocalId(firstData.id);
        firstData?.description && setLocalDescription(firstData.description);
        firstData?.date && setLocalDate(firstData.date);
        firstData?.time && setLocalTime(firstData.time);
        firstData?.color && setLocalColor(firstData.color);
    }

    function handleDelete() {
        setLocalId('');

        (async () => {
            setTogglePopOver && setTogglePopOver(false);
        })();
    }
    function buildDelete() {
        const newList: reminderType[] = [...reminders];
        remove(newList, (reminder) => reminder.id === currentId);
        return newList;
    }

    useEffect(() => {
        if (togglePopOver === true && isEmpty(currentId)) {
            resetLocalValues();
            return;
        }
        (async () => {
            if (togglePopOver === false) {
                const localReminders = await buildReminders();
                (async () => {
                    setReminders && (await setReminders(localReminders));
                    localStorage.setItem('reminders', JSON.stringify(localReminders));
                })();
                const localRemindersList = await buildRemindersList(localReminders);
                (async () => {
                    setRemindersList && (await setRemindersList(localRemindersList));
                    localStorage.setItem('remindersList', JSON.stringify(localRemindersList));
                })();
                setCurrentId && setCurrentId('');
                resetLocalValues();
            } else {
                currentId && setLocalId(currentId);
                loadReminderById();
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
            {localId ? (
                <Button onClick={() => handleDelete()}>
                    <FiTrash />
                </Button>
            ) : null}
            <form onSubmit={handleSubmit}>
                <Textarea
                    name="description"
                    placeholder="Description"
                    value={localDescription}
                    onChange={(e) => setLocalDescription(e.currentTarget.value)}
                />

                <ColorPicker>
                    <TimePicker name="dateTime" value={localTime + ':00 AM'} onChange={(e) => changeHour(e)}>
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
