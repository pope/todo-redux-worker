import {
    ActionTypes,
    SetVisibilityFilterAction,
    TodoVisiblityFilter,
} from '../../shared/types';

/** Reducer for updating the visibilityFilter. */
export function visibilityFilter(
    state = TodoVisiblityFilter.SHOW_ALL,
    action: SetVisibilityFilterAction
): TodoVisiblityFilter {
    switch (action.type) {
        case ActionTypes.SET_TODO_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}
