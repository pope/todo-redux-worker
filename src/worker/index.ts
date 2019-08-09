import { store } from './state';

declare var self: Worker;

self.addEventListener('message', (ev) => {
    switch (ev.data) {
        case 'INCREMENT':
        case 'DECREMENT':
            store.dispatch({type: ev.data});
            break;
        default:
            console.warn(`Unhandled message: ${ev.data}`);
            break;
    }
});
