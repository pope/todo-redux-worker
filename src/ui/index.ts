import 'todomvc-app-css/index.css';

import { addTodo } from '../shared/actions';
import { assert } from '../shared/asserts';
import { dispatch, subscribe } from './store';

subscribe({
    next(state) {
        console.log(state);
    },
});

dispatch(addTodo('Do a thing'));
dispatch(addTodo('Do another thing'));

const body = assert(document.querySelector('body'));
body.classList.remove('loading');
