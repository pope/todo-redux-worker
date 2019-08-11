import { html, TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { toggleTodo, deleteTodo } from '../../shared/actions';
import { Todo } from '../../shared/types';
import { dispatch } from '../store';
import { assert } from '../../shared/asserts';

function todoTemplate({ id, text, completed }: Todo): TemplateResult {
    const className = completed ? 'completed' : '';
    return html`
        <li data-id=${id} class=${className}>
            <div class="view">
                <input class="toggle" type="checkbox" .checked=${completed} />
                <label>${text}</label>
                <button class="destroy"></button>
            </div>
        </li>
    `;
}

/**
 * Handles any click from inside of the list.
 *
 * This then further checks which element was clicked. If it was the checkbox,
 * then the TODO's completed status is toggled. If it was the destroy button,
 * then the TODO is deleted.
 *
 * This is done so that just one event handler is added to the list instead of
 * `n` handlers.
 * @param ev The click event
 */
function clickHandler(ev: Event) {
    const target = ev.target as HTMLElement;

    const liEl = assert(target.closest('li'));
    const id = assert(liEl.getAttribute('data-id'));

    const toggleEl = target.closest('.toggle');
    if (toggleEl) {
        dispatch(toggleTodo(id));
        return;
    }

    const destroyEl = target.closest('.destroy');
    if (destroyEl) {
        dispatch(deleteTodo(id));
        return;
    }
}

/** The template to render and manage a list of TODOs. */
export function todosTemplate(todos: readonly Todo[]): TemplateResult {
    return html`
        <ul class="todo-list" @click=${clickHandler}>
            ${repeat(todos, todoTemplate)}
        </ul>
    `;
}
