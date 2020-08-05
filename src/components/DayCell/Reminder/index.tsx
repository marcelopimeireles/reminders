import React from 'react';
import ReminderForm from '../ReminderForm';

import { Container } from './styles';

export type reminderType = {
    id?: string;
    date?: string;
    time?: string;
    description?: string;
    color?: string;
};

const Reminder: React.FC = () => {
    return (
        <Container>
            <ReminderForm />
        </Container>
    );
};

export default Reminder;
