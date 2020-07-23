import React from 'react';

import ReminderForm from './ReminderForm';
import Reminder, { reminderProps, reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';

import { Container, Button } from './styles';

const Day: React.FC<reminderProps> = (props: reminderProps) => {
    const reminders: reminderType[] = [props.reminder]; // refactor as useState

    function handleEdit(): string {
        return '';
    }
    function handleDelete(id: string): string {
        return id;
    }

    return (
        <Container>
            <Button onClick={() => 20}>
                <TiPlus />
            </Button>
            <ReminderForm />
            <>
                <span>{20}</span>
                {reminders.length > 0
                    ? reminders.map((reminder: reminderType, index) => (
                          <Reminder
                              key={index}
                              reminder={reminder}
                              handleEdit={handleEdit()}
                              handleDelete={handleDelete(reminder.id)}
                          />
                      ))
                    : null}
            </>
        </Container>
    );
};

export default Day;
