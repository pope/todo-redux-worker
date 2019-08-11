import { ActionTypes, AddTodoAction, ClearCompletedAction, CompleteAllTodosAction, DeleteTodoAction, EditTodoAction, SetVisibilityFilterAction, TodoVisiblityFilter, ToggleTodoAction } from './types';

/**
 * Creates an Action for adding a TODO.
 * @param text The TODO string
 */
export function addTodo(text: string): AddTodoAction {
    return {
        type: ActionTypes.ADD_TODO,
        text,
    };
}

/**
 * Creates an Action to delete a TODO.
 * @param id The ID of the TODO
 */
export function deleteTodo(id: string): DeleteTodoAction {
    return {
        type: ActionTypes.DELETE_TODO,
        id,
    };
}

/**
 * Creates an Action to edit a TODO.
 * @param id The ID of the TODO
 * @param text The new TODO string
 */
export function editTodo(id: string, text: string): EditTodoAction {
    return {
        type: ActionTypes.EDIT_TODO,
        id,
        text,
    };
}

/**
 * Creates an Action to toggle the state of a TODO from active to complete.
 * @param id The ID of the TODO
 */
export function toggleTodo(id: string): ToggleTodoAction {
    return {
        type: ActionTypes.TOGGLE_TODO,
        id,
    };
}

/**
 * Creates an Action to mark all TODOs as completed.
 */
export function completeAllTodos(): CompleteAllTodosAction {
    return {
        type: ActionTypes.COMPLETE_ALL_TODOS,
    };
}

/**
 * Creates an Action to delete/clear out all completed TODOs.
 */
export function clearCompletedTodos(): ClearCompletedAction {
    return {
        type: ActionTypes.CLEAR_COMPLETED_TODOS,
    };
}

/**
 * Creates an Action to set the visibility filter when listing all TODOs.
 * @param filter The visibility filter type
 */
export function setVisibilityFilter(filter: TodoVisiblityFilter): SetVisibilityFilterAction {
    return {
        type: ActionTypes.SET_TODO_VISIBILITY_FILTER,
        filter,
    };
}
