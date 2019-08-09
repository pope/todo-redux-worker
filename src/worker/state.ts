import { createStore } from 'redux';

export type Action = 'INCREMENT' | 'DECREMENT';

function counter(state = 0, action: { type: Action }): number {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

export const store = createStore(
    counter,
);

store.subscribe(() => console.log(store.getState()));
