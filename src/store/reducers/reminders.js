import * as actionTypes from '../actions/actions';
// import { reminderType } from '../../components/DayCell/Reminder';
// import { ReminderActionTypes } from '../actions/actions';
import { v1 as uuidv1 } from 'uuid';
// import { has, pairs, object, findIndex } from 'lodash';
// import { format } from 'date-fns';

const INITIAL_STATE = {};

export const createReminder = (state, action) => {
    const reminder = {
        id: uuidv1(),
        time: action.reminder.time,
        description: action.reminder.description,
        color: action.reminder.color,
    };

    return {
        ...state,
        [action.date]: state[action.date] ? state[action.date].concat(reminder) : [reminder],
    };
};

export const updateReminder = (state, action) => {
    const reminders = [];
    [...state[action.date]].forEach((reminder) => {
        if (action.reminder.id === reminder.id) {
            reminder = {
                id: reminder.id,
                time: action.reminder.time,
                description: action.reminder.description,
                color: action.reminder.color,
            };
        }
        reminders.push(reminder);
    });

    return {
        ...state,
        [action.date]: reminders,
    };
};

export const deleteReminder = (state, action) => {
    return {
        ...state,
        [action.date]: [...state[action.date]].filter((reminder) => {
            return reminder.id !== action.id;
        }),
    };
};

export const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CREATE_REMINDER:
            return createReminder(state, action);
        case actionTypes.UPDATE_REMINDER:
            return updateReminder(state, action);
        case actionTypes.DELETE_REMINDER:
            return deleteReminder(state, action);
        default:
    }
};
