import { StoreEnhancer } from 'redux';

declare global {
    interface Window {
        todoWorker: Worker;
    }

    interface Worker {
        composeWithDevTools(...funcs: StoreEnhancer[]): StoreEnhancer;
    }
}
