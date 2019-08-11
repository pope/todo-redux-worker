import { html, TemplateResult } from 'lit-html';
import {
    addTodo,
    clearCompletedTodos,
    completeAllTodos,
} from '../../shared/actions';
import { TodoState } from '../../shared/types';
import { dispatch } from '../store';
import { todosTemplate } from './todos';

function newTodoChangeHandler(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    if (input.value) {
        dispatch(addTodo(input.value));
    }
    input.value = '';
}

function toggleAllClickHandler(): void {
    dispatch(completeAllTodos());
}

function clearCompletedClickHandler(): void {
    dispatch(clearCompletedTodos());
}

/** The overall application HTML template. */
export function appTemplate({ todos }: TodoState): TemplateResult {
    const itemsLeftCount = todos.filter(t => !t.completed).length;
    const hasNoCompleted = todos.length - itemsLeftCount === 0;

    const mainStyle = todos.length === 0 ? 'display: none' : '';
    const clearButtonStyle = hasNoCompleted ? 'display: none' : '';

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
                ${todosTemplate(todos)}
                <footer class="footer">
                    <span class="todo-count">
                        ${itemsLeftCount} items left
                    </span>
                    <ul class="filters">
                        <li>
                            <a href="#/" class="selected">All</a>
                        </li>
                        <li>
                            <a href="#/active">Active</a>
                        </li>
                        <li>
                            <a href="#/completed">Completed</a>
                        </li>
                    </ul>
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
    `;
}
