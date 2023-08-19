import {atom} from 'recoil';

export const notificationsCountState = atom({
    key: 'notificationsCountState',
    default: 0,
})

export const eventSource = atom({
    key: 'eventSource',
    default: undefined,
})