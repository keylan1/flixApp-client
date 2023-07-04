import { createRoot } from 'react-dom';
import { MainView } from '../src/components/main-view';

// Import statement to indicate that you need to bundle index.scss

import './index.scss';

// Main component (will eventually use all the others)

const FlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to rend your app in the root DOM element
root.render(<FlixApplication />);
