import { html, TemplateResult } from 'lit-html';
import { TodoVisiblityFilter } from '../../shared/types';

const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = TodoVisiblityFilter;

/** The template to render the visibility controls. */
export function visibilityFilterTemplate(
    filter: TodoVisiblityFilter
): TemplateResult {
    const getClass = (f: TodoVisiblityFilter) =>
        f === filter ? 'selected' : '';
    return html`
        <ul class="filters">
            <li>
                <a href="#/" class=${getClass(SHOW_ALL)}>
                    All
                </a>
            </li>
            <li>
                <a href="#/active" class=${getClass(SHOW_ACTIVE)}>
                    Active
                </a>
            </li>
            <li>
                <a href="#/completed" class=${getClass(SHOW_COMPLETED)}>
                    Completed
                </a>
            </li>
        </ul>
    `;
}
