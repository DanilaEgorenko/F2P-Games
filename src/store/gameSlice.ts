import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { KEY } from "../keys";
import { IGame } from "../pages/game/interfaces";
import { getCachedData, hasCachedData, saveData } from "../utils/cache";
import { fetchRetry } from "../utils/fetchRetry";

export const fetchGame = createAsyncThunk('game/getGame', async (id: string | undefined, { rejectWithValue }: any) => {
    if (id && hasCachedData(id)) {
        return getCachedData(id);
    }
    return fetchRetry(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
        headers: {
            'X-RapidAPI-Key': KEY,
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        },
    })
        .then(res => {
            return res?.json();
        })
        .then(res => {
            if (id && res) saveData(id, res);
            return res
        })
        .catch((e: Error) => {
            return rejectWithValue(e);
        });
})

interface IState {
    game: IGame | null,
    loading: boolean,
    error: Error | null,
}

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        game: null,
        loading: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGame.fulfilled, (state, action) => {
            state.game = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchGame.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchGame.rejected, (state, action) => {
            state.error = action.payload as null;
        })
    }
});

export const getGame = (state: { game: IState }) => state.game.game;
export const getError = (state: { game: IState }) => state.game.error;
export const isLoading = (state: { game: IState }) => state.game.loading;

export default gameSlice.reducer;