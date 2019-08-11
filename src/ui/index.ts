import { render } from 'lit-html';
import { concat, fromEvent, of } from 'rxjs';
import { map } from 'rxjs/operators';
import 'todomvc-app-css/index.css';
import { setVisibilityFilter } from '../shared/actions';
import { assert } from '../shared/asserts';
import { TodoState, TodoVisiblityFilter } from '../shared/types';
import { appTemplate } from './components/app';
import { dispatch, subscribe } from './store';

const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = TodoVisiblityFilter;

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

const hashChange$ = concat(
    of(document.location.hash),
    fromEvent(window, 'hashchange').pipe(map(() => document.location.hash))
);

function hashToFilter(hash: string): TodoVisiblityFilter {
    switch (hash) {
        case '#/':
            return SHOW_ALL;
        case '#/active':
            return SHOW_ACTIVE;
        case '#/completed':
            return SHOW_COMPLETED;
        default:
            throw Error(`Unsupported hash: ${hash}`);
    }
}
hashChange$.subscribe(hash => {
    dispatch(setVisibilityFilter(hashToFilter(hash)));
});
