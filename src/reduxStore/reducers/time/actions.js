import identificator from './identificator';
import dispatcher from 'reduxStore/dispatcher';

export async function setTime(time) {
    dispatcher('setTime', identificator, time);
}