import { html, TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { toggleTodo, deleteTodo } from '../../shared/actions';
import { Todo } from '../../shared/types';
import { dispatch } from '../store';
import { EventHandlerWithOptions } from './types';
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

const clickHandler: EventHandlerWithOptions = {
    handleEvent(ev: Event) {
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
    },
};

/** The template to render and manage a list of TODOs. */
export function todosTemplate(todos: readonly Todo[]): TemplateResult {
    return html`
        <ul class="todo-list" @click=${clickHandler}>
            ${repeat(todos, todoTemplate)}
        </ul>
    `;
}
