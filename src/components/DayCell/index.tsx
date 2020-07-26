import React from 'react';

import ReminderForm from './ReminderForm';
import Reminder, { reminderProps, reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';

import { Container, Button } from './styles';

type DayCellProps = {
    day?: number;
};

const DayCell: React.FC<DayCellProps> = (props: DayCellProps) => {
    // const reminders: reminderType[] = [props.reminder]; // refactor as useState

    function handleEdit(): string {
        return '';
    }
    function handleDelete(id: string): string {
        return id;
    }

    return (
        <Container>
            <header>
                <span>{props.day}</span>
                {/* {reminders.length > 0
                    ? reminders.map((reminder: reminderType, index) => (
                          <Reminder
                              key={index}
                              reminder={reminder}
                              handleEdit={handleEdit()}
                              handleDelete={handleDelete(reminder.id)}
                          />
                      ))
                    : null} */}
                <Button onClick={() => handleEdit()}>
                    <TiPlus />
                </Button>
            </header>

            <ReminderForm />
        </Container>
    );
};

export default DayCell;
