import { Action } from 'redux';

export type ActionEvent = CustomEvent<Action>;

export function dispatch(target: EventTarget, action: Action): void {
    const ev: ActionEvent = new CustomEvent('dispatch', {
        detail: action,
        bubbles: true,
    });
    target.dispatchEvent(ev);
}
