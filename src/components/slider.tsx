import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import type { Media } from '../types/media.type';
import { useAppDispatch } from '../store/hooks';
import { setActiveMedia } from '../store/slices/activeMediaSlice';

interface SliderProps {
  media: Media[];
}

const Slider = ({ media }: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (media[activeIndex]) {
      dispatch(setActiveMedia(media[activeIndex]));
    }
  }, [media, activeIndex, dispatch]);

  const updateActiveIndex = (action: 'next' | 'prev') => {
    setActiveIndex((prev) => {
      let newIndex = 0;
      if (action === 'next') {
        newIndex = Math.min(prev + 1, media.length - 1);
      } else newIndex = Math.max(prev - 1, 0);

      scrollToStart(newIndex);
      return newIndex;
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      updateActiveIndex('next');
    } else if (e.key === 'ArrowLeft') {
      updateActiveIndex('prev');
    }
  };

  const scrollToStart = (index: number) => {
    const slider = sliderRef.current;
    const card = cardRefs.current[index];

    if (!slider || !card) return;

    const paddingLeft = parseInt(
      getComputedStyle(slider).paddingLeft || '0',
      10
    );

    const left = card.offsetLeft - paddingLeft;

    slider.scrollTo({
      left,
      behavior: 'smooth',
    });
  };

  return media.length ? (
    <div
      className="slider"
      data-testid="slider"
      tabIndex={0}
      ref={sliderRef}
      onKeyDown={handleKeyDown}
    >
      <div className="slider__inner">
        {media.map(({ id, title, images: { artwork_portrait } }, index) => (
          <div
            className={`card${index == activeIndex ? ' card--focused' : ''}`}
            key={id}
            ref={(el: HTMLDivElement | null): void => {
              cardRefs.current[index] = el;
            }}
          >
            <div className="card__image">
              <img
                // src={artwork_portrait || '/images/default.jpeg'}
                src={'/images/default.jpeg'}
                alt={title}
              />
            </div>
            <div className="card__title">{title}</div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default Slider;
