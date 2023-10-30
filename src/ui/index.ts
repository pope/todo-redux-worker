import { render } from 'lit-html';
import { concat, fromEvent, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { setVisibilityFilter } from '../shared/actions';
import { assert } from '../shared/asserts';
import { TodoVisiblityFilter } from '../shared/types';
import 'todomvc-app-css/index.css';
import { appTemplate } from './components/app';
import { ActionEvent } from './components/events';
import { createStore, Store } from './store';

function loaded(): void {
    const body = assert(document.querySelector('body'));
    body.classList.remove('loading');
}

function hashToFilter(hash: string): TodoVisiblityFilter {
    switch (hash) {
        case '#/active':
            return TodoVisiblityFilter.SHOW_ACTIVE;
        case '#/completed':
            return TodoVisiblityFilter.SHOW_COMPLETED;
        default:
            return TodoVisiblityFilter.SHOW_ALL;
    }
}

class App {
    private readonly appEl = assert(document.querySelector('#app'));

    constructor(
        private readonly store: Store,
        hashChange$: Observable<string>
    ) {
        store.subscribe({
            next: () => {
                this.renderApp();
            },
        });
        hashChange$.subscribe((hash) => {
            store.dispatch(setVisibilityFilter(hashToFilter(hash)));
        });

        this.appEl.addEventListener('dispatch', (ev) => {
            const actionEvent = ev as ActionEvent;
            store.dispatch(actionEvent.detail);
        });
    }

    private renderApp(): void {
        render(appTemplate(this.store.currentState), this.appEl as HTMLElement);
    }
}

async function createApp(): Promise<App> {
    const store = await createStore();
    const hashChange$ = concat(
        of(document.location.hash),
        fromEvent(window, 'hashchange').pipe(map(() => document.location.hash))
    );
    return new App(store, hashChange$);
}

createApp();
loaded();
