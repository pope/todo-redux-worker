import { html, TemplateResult } from 'lit-html';
import {
    addTodo,
    clearCompletedTodos,
    toggleAllTodos,
} from 'src/shared/actions';
import { Todo, TodoState, TodoVisiblityFilter } from 'src/shared/types';
import { dispatch } from './events';
import { todosTemplate } from './todos';
import { visibilityFilterTemplate } from './visibilityFilter';

const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = TodoVisiblityFilter;

function newTodoChangeHandler(this: EventTarget, ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const val = input.value.trim();
    if (val) {
        dispatch(this, addTodo(val));
    }
    input.value = '';
}

function toggleAllClickHandler(this: EventTarget): void {
    dispatch(this, toggleAllTodos());
}

function clearCompletedClickHandler(this: EventTarget): void {
    dispatch(this, clearCompletedTodos());
}

function getFilteredTodos(
    todos: readonly Todo[],
    visibilityFilter: TodoVisiblityFilter
): readonly Todo[] {
    switch (visibilityFilter) {
        case SHOW_ALL:
            return todos;
        case SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case SHOW_COMPLETED:
            return todos.filter(t => t.completed);
    }
}

/** The overall application HTML template. */
export function appTemplate({
    todos,
    visibilityFilter,
}: TodoState): TemplateResult {
    const itemsLeftCount = todos.filter(t => !t.completed).length;
    const hasNoCompleted = todos.length - itemsLeftCount === 0;

    const mainStyle = todos.length === 0 ? 'display: none' : '';
    const clearButtonStyle = hasNoCompleted ? 'display: none' : '';

    const filteredTodos = getFilteredTodos(todos, visibilityFilter);

    return html`
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input
                    @change=${newTodoChangeHandler}
                    class="new-todo"
                    placeholder="What needs to be done?"
                    autofocus
                />
            </header>
            <section class="main" .style=${mainStyle}>
                <input
                    id="toggle-all"
                    class="toggle-all"
                    type="checkbox"
                    @click=${toggleAllClickHandler}
                    .checked=${itemsLeftCount === 0}
                />
                <label for="toggle-all">Mark all as complete</label>
                ${todosTemplate(filteredTodos)}
                <footer class="footer">
                    <span class="todo-count">
                        ${itemsLeftCount} items left
                    </span>
                    ${visibilityFilterTemplate(visibilityFilter)}
                    <button
                        class="clear-completed"
                        @click=${clearCompletedClickHandler}
                        .style=${clearButtonStyle}
                    >
                        Clear completed
                    </button>
                </footer>
            </section>
        </section>
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>
                Written by
                <a href="http://github.com/pope">K. Adam Christensen</a>
            </p>
            <p>In the style of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    `;
}
