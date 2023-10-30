import { devToolsEnhancer } from '@redux-devtools/remote';
import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from './reducers/index';

declare var self: Worker;

declare module globalThis {
    var DEBUG: boolean;
}

const store = globalThis.DEBUG
    ? createStore(
          rootReducer,
          devToolsEnhancer({
              realtime: true,
              hostname: 'localhost',
              port: 8000,
          })
      )
    : createStore(rootReducer);

self.postMessage(store.getState());
store.subscribe(() => {
    self.postMessage(store.getState());
});

self.addEventListener('message', (ev) => {
    store.dispatch(ev.data);
});
