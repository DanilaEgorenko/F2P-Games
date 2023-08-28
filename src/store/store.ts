import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import gamesReducer from './gamesSlice';

const store = configureStore({
    reducer: {
        games: gamesReducer,
        game: gameReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;