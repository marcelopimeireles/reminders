import React, { useState } from 'react';

import ReminderForm from './ReminderForm';
import Reminder, { reminderProps, reminderType } from './Reminder';

import { TiPlus } from 'react-icons/ti';

import { Container, Button, ReminderDot } from './styles';

type DayCellProps = {
    day?: number;
    reminder?: reminderType;
};

const DayCell: React.FC<DayCellProps> = (props: DayCellProps) => {
    const [reminders, setReminders] = useState<reminderType[]>([]);

    function handleEdit(): string {
        return '';
    }
    function handleDelete(id: string): string {
        return id;
    }

    console.log(reminders);
    return (
        <Container>
            <header>
                <span>{props.day}</span>
                <Button onClick={() => handleEdit()}>
                    <TiPlus />
                </Button>
            </header>
            <section>
                {reminders && reminders.length > 0
                    ? reminders.map((reminder: reminderType, index) => {
                          return <ReminderDot key={index} id={reminder.id} color={reminder.color} />;
                      })
                    : null}
            </section>
            {/*    <Reminder
            //       key={index}
            //       reminder={reminder}
            //       handleEdit={handleEdit()}
            //       handleDelete={handleDelete(reminder.id)}
            //   />
            // <ReminderForm /> */}
        </Container>
    );
};

export default DayCell;
