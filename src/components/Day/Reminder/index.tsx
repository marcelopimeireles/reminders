import React from 'react';

import { Container } from './styles';

export type reminderProps = {
    reminder: reminderType;
    handleEdit: string;
    handleDelete: string;
};

export type reminderType = {
    id: string;
    time: Date;
    description: string;
    color: string;
};

const reminder: React.FC<reminderProps> = (props: reminderProps) => {
    return <Container>{props.reminder.id}</Container>;
};

export default reminder;
