import { ActionTypes, Todo, TodoActionTypes } from '../../shared/types';

let id = 0;
function generateId(): string {
    return `todo-${id++}`;
}

/** Reducer to update the TODO list. */
export function todos(
    state: readonly Todo[] = [],
    action: TodoActionTypes
): readonly Todo[] {
    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return [
                ...state,
                {
                    id: generateId(),
                    text: action.text,
                    completed: false,
                },
            ];

        case ActionTypes.EDIT_TODO:
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                }
                return {
                    ...todo,
                    text: action.text,
                };
            });

        case ActionTypes.DELETE_TODO:
            return state.filter(todo => todo.id !== action.id);

        case ActionTypes.TOGGLE_TODO:
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                }
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            });

        case ActionTypes.COMPLETE_ALL_TODOS:
            return state.map(todo => {
                if (todo.completed) {
                    return todo;
                }
                return {
                    ...todo,
                    completed: true,
                };
            });

        case ActionTypes.CLEAR_COMPLETED_TODOS:
            return state.filter(todo => !todo.completed);

        default:
            return state;
    }
}
