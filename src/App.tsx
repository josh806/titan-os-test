import './App.css';
import Slider from './components/slider';
import useMedia from './hooks/useMedia';
import { useAppSelector } from './store/hooks';

const App = () => {
  const activeMedia = useAppSelector((state) => state.activeMedia);
  const { media, loading, error } = useMedia();

  const renderSlider = () =>
    error ? <div>{error}</div> : <Slider media={media} />;

  return (
    <>
      {activeMedia?.media?.title && (
        <h1 className="container">{activeMedia.media.title}</h1>
      )}
      {loading ? <div>Loading...</div> : renderSlider()}
    </>
  );
};

export default App;
