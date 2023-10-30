import { html, TemplateResult } from 'lit-html';
import { ClassInfo, classMap } from 'lit-html/directives/class-map.js';
import { repeat } from 'lit-html/directives/repeat.js';
import {
    deleteTodo,
    editTodo,
    toggleEditableTodo,
    toggleTodo,
} from '../../shared/actions';
import { assert } from '../../shared/asserts';
import { Todo } from '../../shared/types';
import { dispatch } from './events';

function getIdFromDom(el: HTMLElement): string {
    const liEl = assert(el.closest('li'));
    return assert(liEl.getAttribute('data-id'));
}

const editBlurHandler: EventListenerObject & Partial<AddEventListenerOptions> =
    {
        handleEvent(ev: Event): void {
            const target = ev.target as HTMLElement;
            const id = getIdFromDom(target);
            dispatch(target, toggleEditableTodo(id));
        },
        capture: true,
    };

function editKeyUpHandler(this: EventTarget, ev: KeyboardEvent): void {
    const target = ev.target as HTMLInputElement;
    switch (ev.key) {
        case 'Enter': {
            // Blur first to go back to non-edit mode.
            target.blur();

            const id = getIdFromDom(target);
            const val = target.value.trim();
            const action = val ? editTodo(id, val) : deleteTodo(id);
            dispatch(this, action);
            break;
        }
        case 'Escape':
            target.blur();
            break;
        default:
            break;
    }
}

function editTodoTemplate(text: string, id: string): TemplateResult {
    const editId = `${id}-{edit}`;

    // This is a terrible hack for this case where I'm just using lit-html and
    // not something like LitElement. We need to be focus the new input, but I
    // haven't found a callback for when the DOM gets updated that's local to
    // just this change in an inexpensive manner. So I'll just be cheap and wait
    // for the next task actually focus the element.
    requestAnimationFrame(() => {
        const el = document.querySelector(
            `.edit[data-id="${editId}"]`
        ) as HTMLInputElement | null;
        if (!el) {
            // Element was already removed.
            return;
        }

        // Delay setting the value here so that the cursor is at the end of
        // string in the `input` element. If we add it to the binding, bringing
        // focus late like this results in the cursor showing up at the start
        // of the `input` element.
        el.value = text;
        el.focus();
    });

    return html`
        <input
            data-id=${editId}
            class="edit"
            @blur=${editBlurHandler}
            @keyup=${editKeyUpHandler}
        />
    `;
}

function todoTemplate({ id, text, completed, editable }: Todo): TemplateResult {
    const classes: ClassInfo = {
        completed,
        editing: editable,
    };
    return html`
        <li data-id=${id} class=${classMap(classes)}>
            <div class="view">
                <input class="toggle" type="checkbox" .checked=${completed} />
                <label>${text}</label>
                <button class="destroy"></button>
            </div>
            ${editable ? editTodoTemplate(text, id) : ''}
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
function clickHandler(this: EventTarget, ev: Event) {
    const target = ev.target as HTMLElement;

    const toggleEl = target.closest('.toggle');
    if (toggleEl) {
        const id = getIdFromDom(target);
        dispatch(this, toggleTodo(id));
        return;
    }

    const destroyEl = target.closest('.destroy');
    if (destroyEl) {
        const id = getIdFromDom(target);
        dispatch(this, deleteTodo(id));
        return;
    }
}

function doubleClickHandler(this: EventTarget, ev: MouseEvent): void {
    const target = ev.target as HTMLElement;
    if (target.closest('.edit')) {
        // Don't handle extra double clicks from inside of the edit input.
        // Otherwise it blocks users from double clicking to select all of the
        // text.
        return;
    }
    const id = getIdFromDom(target);
    dispatch(this, toggleEditableTodo(id));
}

/** The template to render and manage a list of TODOs. */
export function todosTemplate(todos: readonly Todo[]): TemplateResult {
    return html`
        <ul
            class="todo-list"
            @click=${clickHandler}
            @dblclick=${doubleClickHandler}
        >
            ${repeat(todos, todoTemplate)}
        </ul>
    `;
}
