import { IState } from "./initialState";

export const getCategory = (state: IState) => state.category ? '&category=' + state.category : '';
export const getPlatform = (state: IState) => state.platform ? '&platform=' + state.platform : '';
export const getSortBy = (state: IState) => state.sortBy ? '&sort-by=' + state.sortBy : '';