export const reducerFiltersAndSort = (state: any, action: { type: string; payload: any; }) => {
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