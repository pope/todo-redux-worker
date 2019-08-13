import { createStore } from 'redux';
import { rootReducer } from './reducers/index';

/* eslint-disable-next-line no-var */
declare var self: Worker;

// TODO(pope): Conditionally include this.
importScripts('worker-devtools-1.0.0.js');

const store = createStore(rootReducer, self.composeWithDevTools());

self.postMessage(store.getState());
store.subscribe(() => {
    self.postMessage(store.getState());
});

self.addEventListener('message', ev => {
    store.dispatch(ev.data);
});
