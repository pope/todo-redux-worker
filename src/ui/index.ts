import 'todomvc-app-css/index.css';

import { render } from 'lit-html';
import { assert } from '../shared/asserts';
import { TodoState } from '../shared/types';
import { appTemplate } from './components/app';
import { subscribe } from './store';

const body = assert(document.querySelector('body'));
body.classList.remove('loading');

const appEl = assert(document.querySelector('#app'));

function renderApp(state: TodoState): void {
    render(appTemplate(state), appEl);
}

subscribe({
    next(state) {
        renderApp(state);
    },
});
