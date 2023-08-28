import initialState, { IState } from "./initialState";

export const reducerFiltersAndSort = (state: IState = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case 'changeCategory':
            return { ...state, category: action.payload };
        case 'changePlatform':
            return { ...state, platform: action.payload };
        case 'changeSortBy':
            return { ...state, sortBy: action.payload };
        default:
            return state;
    }
};