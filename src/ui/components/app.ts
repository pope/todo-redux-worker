import { html, TemplateResult } from 'lit-html';
import { TodoState } from '../../shared/types';

/** The overall application HTML template. */
export function appTemplate(state: TodoState): TemplateResult {
    console.log(state);
    return html`
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input
                    class="new-todo"
                    placeholder="What needs to be done?"
                    autofocus
                />
            </header>
            <section class="main">
                <input id="toggle-all" class="toggle-all" type="checkbox" />
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list"></ul>
                <footer class="footer">
                    <span class="todo-count">0 items left</span>
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
                    <button class="clear-completed">
                        Clear completed
                    </button>
                </footer>
            </section>
        </section>
    `;
}
