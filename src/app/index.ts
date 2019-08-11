import 'todomvc-app-css/index.css';

import { Action } from 'redux';
import { addTodo } from '../shared/actions';
import { assert } from '../shared/asserts';
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

const body = assert(document.querySelector('body'));
body.classList.remove('loading');
