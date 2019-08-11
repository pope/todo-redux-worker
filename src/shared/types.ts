/**
 * The data for a TODO object.
 */
export interface Todo {
    readonly id: string;
    readonly text: string;
    readonly completed: boolean;
}

/**
 * All of the available filter types for sorting TODO items.
 */
export enum TodoVisiblityFilter {
    SHOW_ALL = 'SHOW_ALL',
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW_ACTIVE = 'SHOW_ACTIVE',
}

/**
 * The overall state of the TODO app.
 */
export interface TodoState {
    readonly todos: readonly Todo[];
    readonly visibilityFilter: TodoVisiblityFilter;
}

/**
 * All of the action types for the store.
 */
export enum ActionTypes {
    ADD_TODO = 'ADD_TODO',
    DELETE_TODO = 'DELETE_TODO',
    EDIT_TODO = 'EDIT_TODO',
    TOGGLE_TODO = 'TOGGLE_TODO',
    TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS',
    CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS',
    SET_TODO_VISIBILITY_FILTER = 'SET_TODO_VISIBILITY_FILTER',
}

/** Action for adding a new TODO. */
export interface AddTodoAction {
    type: typeof ActionTypes.ADD_TODO;
    text: string;
}

/** Action for deleting a TODO by ID. */
export interface DeleteTodoAction {
    type: typeof ActionTypes.DELETE_TODO;
    id: string;
}

/** Action to replace the text of  a TODO by ID.  */
export interface EditTodoAction {
    type: typeof ActionTypes.EDIT_TODO;
    id: string;
    text: string;
}

/** Action for toggling whether the TODO is complete or not. */
export interface ToggleTodoAction {
    type: typeof ActionTypes.TOGGLE_TODO;
    id: string;
}

/** Action for toggling all TODOs as complete or not. */
export interface ToggleAllTodosAction {
    type: typeof ActionTypes.TOGGLE_ALL_TODOS;
}

/** Action for deleting all completed TODOs. */
export interface ClearCompletedAction {
    type: typeof ActionTypes.CLEAR_COMPLETED_TODOS;
}

/** Action for setting the visibility filter of the TODO list. */
export interface SetVisibilityFilterAction {
    type: typeof ActionTypes.SET_TODO_VISIBILITY_FILTER;
    filter: TodoVisiblityFilter;
}

/** All of the Action Types related to the TODO list in the state. */
export type TodoActionTypes =
    | AddTodoAction
    | DeleteTodoAction
    | EditTodoAction
    | ToggleTodoAction
    | ToggleAllTodosAction
    | ClearCompletedAction;
