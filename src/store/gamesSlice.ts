import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { KEY } from "../keys";
import { IGames } from "../pages/main/interfaces";
import { fetchRetry } from "../utils/fetchRetry";

export const fetchGames = createAsyncThunk('games/getGames', async (abortController: AbortController | undefined, { getState, rejectWithValue }: any) => {
    const { category, platform, sortBy }: IState = getState().games;
    return fetchRetry(`https://free-to-play-games-database.p.rapidapi.com/api/games?${category ? '&category=' + category : ''}${platform ? '&platform=' + platform : ''}${sortBy ? '&sort-by=' + sortBy : ''}`, {
        headers: {
            'X-RapidAPI-Key': KEY,
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        },
        //signal: abortController?.signal,
    })
        .then(res => res?.json())
        .catch((e: Error) => {
            return rejectWithValue(e);
        });
})

interface IState {
    games: {
        data: IGames[],
        error: Error | null,
        loading: boolean,
    },
    category: string | undefined;
    platform: string | undefined;
    sortBy: string | undefined;
}

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        games: {
            data: [],
            error: null,
            loading: true,
        },
        category: undefined,
        platform: undefined,
        sortBy: undefined,
    },
    reducers: {
        changeCategory(state, action) {
            state.category = action.payload;
        },
        changePlatform(state, action) {
            state.platform = action.payload;
        },
        changeSortBy(state, action) {
            state.sortBy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGames.fulfilled, (state, action) => {
            state.games.data = action.payload;
            state.games.loading = false;
        })
        builder.addCase(fetchGames.pending, (state) => {
            state.games.loading = true;
        })
        builder.addCase(fetchGames.rejected, (state, action) => {
            state.games.error = action.payload as null;
        })
    }
});

export const getGames = (state: { games: IState }) => state.games.games.data;
export const getError = (state: { games: IState }) => state.games.games.error;
export const isLoading = (state: { games: IState }) => state.games.games.loading;

export const { changeCategory, changePlatform, changeSortBy } = gamesSlice.actions;

export default gamesSlice.reducer;