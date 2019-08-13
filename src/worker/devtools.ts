import { StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

/* eslint-disable-next-line no-var */
declare var self: Worker;

self.composeWithDevTools = (...funcs: StoreEnhancer[]) =>
    composeWithDevTools({
        realtime: true,
    })(...funcs);
