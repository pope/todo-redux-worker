import { createStore } from 'redux';
import { rootReducer } from './reducers/index';

/* eslint-disable-next-line no-var */
declare var self: Worker;

const store = createStore(rootReducer);

self.postMessage(store.getState());
store.subscribe(() => {
    self.postMessage(store.getState());
});

self.addEventListener('message', ev => {
    store.dispatch(ev.data);
});
