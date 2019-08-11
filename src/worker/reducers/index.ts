import { combineReducers } from 'redux';
import { todos } from './todos';
import { visibilityFilter } from './visibilityFilter';

/** The main reducer for the TodoState. */
export const rootReducer = combineReducers({
    todos,
    visibilityFilter,
});
