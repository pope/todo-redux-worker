import { store } from './state';

const context: Worker = self as any;

context.addEventListener('message', (ev) => {
    switch(ev.data) {
        case 'INCREMENT':
        case 'DECREMENT':
            store.dispatch({ type: ev.data });
            break;
        default:
            console.warn(`Unhandled message: ${ev.data}`);
            break;
    }
});
