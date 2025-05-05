import { screen, fireEvent, waitFor } from '@testing-library/react';
import Slider from '../slider';
import { renderWithStore } from '../../store/tests/store.util';
import { mockMovies } from '../../mocks/fetchMedia.mock';

HTMLElement.prototype.scrollTo = () => {};
const render = () => renderWithStore(<Slider media={mockMovies} />);

describe('Slider', () => {
  it('renders media', () => {
    render();
    expect(screen.getByAltText('Siete Almas')).toBeInTheDocument();
    expect(screen.getByAltText('Ocho Almas')).toBeInTheDocument();
  });

  it('focuses the slider on mount', () => {
    const { container } = render();
    const slider = container.querySelector('.slider');
    expect(slider).toHaveFocus();
  });

  it('moves focus right on ArrowRight key', async () => {
    const { container } = render();
    const slider = container.querySelector('.slider');
    fireEvent.keyDown(slider!, { key: 'ArrowRight' });

    const focusedCard = container.querySelector('.card--focused');
    expect(focusedCard).toBeInTheDocument();
    expect(focusedCard?.textContent).toContain('Ocho Almas');
  });

  it('stores the active media in Redux', async () => {
    const { container, store } = render();
    const slider = container.querySelector('.slider');
    fireEvent.keyDown(slider!, { key: 'ArrowRight' });

    await waitFor(() => {
      const state = store.getState();
      expect(state.activeMedia?.media?.title).toBe('Ocho Almas');
    });
  });
});

/*
Additional tests for robustness:
- ArrowLeft stops at index 0
- ArrowRight stops at last item
- Scroll is triggered when navigating
- First card is focused on mount
*/
