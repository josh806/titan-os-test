import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import activeMediaReducer from '../slices/activeMediaSlice';

export function renderWithStore(ui: ReactElement) {
  const store = configureStore({
    reducer: {
      activeMedia: activeMediaReducer,
    },
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
