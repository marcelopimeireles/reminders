import React from 'react';
import { FiTrash } from 'react-icons/fi';

import ReminderForm from '../ReminderForm';

import { Container, Tools, Button } from './styles';

export type reminderProps = {
    reminder: reminderType | null | undefined;
    handleDelete?: (id: string | null | undefined) => string | null | undefined;
};

export type reminderType = {
    id?: string | null | undefined;
    time: Date | null | undefined;
    description: string | null | undefined;
    color: string | null | undefined;
};

const Reminder: React.FC<reminderProps> = (props: reminderProps) => {
    return (
        <Container>
            <Tools>
                {props.reminder?.id ? (
                    <Button onClick={() => props.handleDelete}>
                        <FiTrash />
                    </Button>
                ) : null}
            </Tools>
            {props.reminder?.id ? (
                <>
                    <strong>{props.reminder?.description}</strong>
                    <time>{props.reminder?.time}</time>
                </>
            ) : (
                <ReminderForm reminder={props.reminder || null} />
            )}
        </Container>
    );
};

export default Reminder;
