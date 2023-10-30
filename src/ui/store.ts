import { Action } from 'redux';
import { Observable, PartialObserver, ReplaySubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { TodoState } from '../shared/types';
const currentState$ = new ReplaySubject<TodoState>();

self.todoWorker.addEventListener('message', (ev) => {
    currentState$.next(ev.data);
});

/** A domain-specific version of a redux store. */
export interface Store {
    readonly currentState: TodoState;

    /** Dispatches an action to the Redux store. */
    dispatch(action: Action): void;

    /** Subscribes to changes on the TodoState from the Redux store. */
    subscribe(observer?: PartialObserver<TodoState>): Subscription;

    /** Cleans up the store when it's no longer needed. */
    dispose(): void;
}

class DefaultStore implements Store {
    private readonly subs: Subscription[] = [];

    constructor(
        private currentStateInner: TodoState,
        private readonly state$: Observable<TodoState>,
        private readonly worker: Worker
    ) {
        this.subscribe({
            next: (newValue) => {
                this.currentStateInner = newValue;
            },
        });
    }

    get currentState(): TodoState {
        return this.currentStateInner;
    }

    dispatch(action: Action): void {
        this.worker.postMessage(action);
    }

    subscribe(observer?: PartialObserver<TodoState>): Subscription {
        const sub = this.state$.subscribe(observer);
        this.subs.push(sub);
        return sub;
    }

    dispose(): void {
        this.subs.forEach((s) => {
            s.unsubscribe();
        });
        this.subs.length = 0; // Delete the array.
    }
}

/** Create a new store. */
export async function createStore(): Promise<Store> {
    const state = await currentState$.pipe(first()).toPromise();
    return new DefaultStore(state!, currentState$, self.todoWorker);
}
