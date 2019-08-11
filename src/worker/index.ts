import { createStore } from 'redux';
import { rootReducer } from './reducers/index';

declare var self: Worker;

const store = createStore(rootReducer);

store.subscribe(() => {
    self.postMessage(store.getState());
});

self.addEventListener('message', ev => {
    store.dispatch(ev.data);
});
