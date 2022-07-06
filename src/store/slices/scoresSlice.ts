import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ScoresState {
  name: string,
  score: number;
}

const initialState: ScoresState[] = [];

export const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<ScoresState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.push(action.payload);
      return state;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addScore } = scoresSlice.actions

export default scoresSlice.reducer