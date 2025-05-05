import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media } from '../../types/media.type';

interface ActiveMediaState {
  media: Media | null;
}

const initialState: ActiveMediaState = {
  media: null,
};

const activeMediaSlice = createSlice({
  name: 'activeMedia',
  initialState,
  reducers: {
    setActiveMedia: (state, action: PayloadAction<Media>) => {
      state.media = action.payload;
    },
  },
});

export const { setActiveMedia } = activeMediaSlice.actions;
export default activeMediaSlice.reducer;
