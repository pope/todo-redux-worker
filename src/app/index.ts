import { Action } from 'redux';
import { addTodo } from '../shared/actions';
import { TodoState } from '../shared/types';

const worker = new Worker('/dist/worker.bundle.js');

worker.addEventListener('message', ev => {
    console.log(ev.data as TodoState);
});

function dispatch(action: Action): void {
    worker.postMessage(action);
}

dispatch(addTodo('Do a thing'));
dispatch(addTodo('Do another thing'));
