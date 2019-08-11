import { Action } from 'redux';
import { PartialObserver, ReplaySubject, Subscription } from 'rxjs';
import { TodoState } from '../shared/types';

declare global {
    interface Window {
        todoWorker: Worker;
    }
}

const currentState$ = new ReplaySubject<TodoState>();

self.todoWorker.addEventListener('message', ev => {
    currentState$.next(ev.data);
});

/** Dispatches an action to the Redux store. */
export function dispatch(action: Action): void {
    self.todoWorker.postMessage(action);
}

/** Subscribes to changes on the TodoState from the Redux store. */
export function subscribe(observer?: PartialObserver<TodoState>): Subscription {
    return currentState$.subscribe(observer);
}
