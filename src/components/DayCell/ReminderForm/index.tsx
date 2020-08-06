import React, { useState, useContext, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';

import { v1 as uuidV1 } from 'uuid';
import format from 'date-fns/format';
import getTime from 'date-fns/getTime';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { Dictionary, map, groupBy, isEmpty, remove } from 'lodash';

import { CalendarCtx, CalendarContextInterface } from '../../CalendarProvider';

import { reminderType } from '../Reminder';

import { Container, Textarea, ColorPicker, Radio, RadioInput, TimePicker, Text, SaveButton, Button } from './styles';

const ReminderForm: React.FC = () => {
    const {
        togglePopOver,
        setTogglePopOver,
        reminders,
        setReminders,
        remindersList,
        setRemindersList,
        today,
        currentId,
        setCurrentId,
        colors,
        hours,
    } = useContext<CalendarContextInterface>(CalendarCtx);

    const [localColor, setLocalColor] = useState<string>('');
    const [localDescription, setLocalDescription] = useState<string>('');
    const [localDate, setLocalDate] = useState<string>('');
    const [localTime, setLocalTime] = useState<string>('00');
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

    function buildRemindersById() {
        const result: reminderType[] = [...reminders];

        const data: reminderType = {
            id: currentId || uuidV1(),
            description: localDescription,
            date: localDate,
            time: localTime,
            color: localColor,
        };

        if (!!currentId && isEmpty(localId)) return buildDelete(result, currentId);

        if (!!currentId && currentId === localId) return buildUpdateById(result, data, currentId);

        return buildCreate(result, data);
    }

    function buildDelete(result: reminderType[], id: string): reminderType[] {
        remove(result, (reminder) => reminder.id === id);
        return result;
    }

    function buildUpdateById(result: reminderType[], data: reminderType, id: string): reminderType[] {
        return map(result, (reminder) => (reminder.id === id ? data : reminder));
    }

    function buildCreate(result: reminderType[], data: reminderType) {
        return [...result].concat(data);
    }

    function resetLocalValues() {
        setLocalId('');
        setLocalDescription('');
        setLocalColor('');
        changeHour();
    }

    function buildRemindersList(reminders: reminderType[]) {
        const newList: Dictionary<reminderType[]> = groupBy(reminders, 'date');
        return newList;
    }

    function changeHour(e: ChangeEvent<HTMLSelectElement> | initHour = initHour) {
        e.preventDefault();
        const hourArray: string[] | undefined = e.target.value?.split(':');
        let result = hourArray && Number(hourArray[0]);
        let date: Date;
        if (hourArray && hourArray.length > 0 && hourArray[hourArray.length - 1].indexOf('PM') !== -1) {
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
        const data: reminderType[] = reminders ? reminders.filter((reminder) => reminder.id === id) : [];
        const firstData = data ? data[0] : null;
        if (firstData) {
            const { id, description, date, time, color } = firstData;
            setLocalId(id || '');
            setLocalDescription(description || '');
            setLocalDate(date || '');
            setLocalTime(time || '');
            setLocalColor(color || '');
        } else {
            resetLocalValues();
        }
    }

    function handleDelete() {
        setLocalId('');
        setTogglePopOver && setTogglePopOver(false);
    }

    useMemo(() => {
        if (hours) {
            initHour.target.value = hours[0];
            changeHour(initHour);
        }
    }, []); // set initHour when did mount

    useEffect(() => {
        if (togglePopOver && currentId) {
            resetLocalValues();
            // retrieve local reminder
            loadReminderById(currentId);
            return;
        }
        // save new reminders (create, update, delete)
        // console.log('save new reminders (create, update, delete)', !disabled);
        !disabled && reminders ? setReminders && setReminders(buildRemindersById()) : null;
        resetLocalValues();
        setCurrentId && setCurrentId('');
    }, [togglePopOver, setReminders]); // create, update, delete when toggle off or retrieve when toggle on

    useEffect(() => {
        reminders && setRemindersList && setRemindersList(buildRemindersList(reminders));
    }, [reminders, setRemindersList]); // generate and update reminders list when update reminders

    useEffect(() => {
        if (!isEmpty(reminders) && !isEmpty(remindersList)) {
            localStorage.setItem('reminders', JSON.stringify(reminders));
            localStorage.setItem('remindersList', JSON.stringify(remindersList));
        } else if (!reminders) {
            localStorage.clear();
        }
    }, [reminders, remindersList]); // save reminders and reminders list to local storage when update reminders list

    useEffect(() => {
        if (reminders)
            for (const reminder of reminders) {
                if (window.Notification && Notification.permission !== 'denied') {
                    Notification.requestPermission(function (status) {
                        new Notification(`${reminder.description}`, {
                            body: formatDistanceToNow(new Date(`${reminder.date}T${reminder.time}:00:00Z`), {
                                addSuffix: true,
                            }),
                            timestamp: getTime(new Date(`${reminder.date}T${reminder.time}:00:00Z`)),
                        });
                    });
                }
            }
    }, [reminders]); // set reminders as notification

    useEffect(() => {
        if (togglePopOver)
            if (window.Notification && Notification.permission !== 'denied') {
                Notification.requestPermission(function (status) {
                    new Notification(`${localDescription}`, {
                        body: formatDistanceToNow(new Date(`${localDate}T${localTime}:00:00Z`), {
                            addSuffix: true,
                        }),
                        timestamp: getTime(new Date(`${localDate}T${localTime}:00:00Z`)),
                    });
                });
            }
    }, [togglePopOver]); // show reminders as notification

    useEffect(() => {
        isSubmitDisabled();
    }, [localDate, localTime, localColor, localDescription]); // check ready for submit when change data

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
