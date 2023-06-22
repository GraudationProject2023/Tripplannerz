import {atom} from 'recoil';

export const selectedImagesState = atom({
    key: 'selectedImagesState',
    default: null,
});

export const castState = atom({
    key: 'castState',
    default: '0',
});

export const rankState = atom({
    key: 'rankState',
    default: '-1',
});

export const vestState = atom({
    key: 'vestState',
    default: '0',
});