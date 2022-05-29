import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: ICat[] = [];

export interface ICat {
    id: string,
    isFavorite: undefined | boolean
    url?: string,
}

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        getCats: (state: ICat[], action: PayloadAction<ICat[]>) => {
            return action.payload;
        },
        changeFavorite: (state: ICat[], action: PayloadAction<ICat>) => {
            const index = state.findIndex((cat) => cat.id === action.payload.id);
            const element = state.find((cat) => cat.id === action.payload.id);
            return [...state.slice(0, index), {...element, isFavorite: action.payload.isFavorite}, ...state.slice(index+1)] as ICat[];
        }
    },
})

const store = configureStore({
    reducer: {
        cats: catsSlice.reducer,
    },
})

export const { getCats, changeFavorite } = catsSlice.actions

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
