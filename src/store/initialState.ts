import { IGames } from "../pages/main/interfaces";

export interface IState {
    games: IGames[];
    category: string | undefined;
    platform: string | undefined;
    sortBy: string | undefined;
}

const initialState: IState = {
    games: [],
    category: undefined,
    platform: undefined,
    sortBy: undefined,
}

export default initialState;