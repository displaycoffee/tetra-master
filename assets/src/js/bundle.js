/* react imports */
import { createRoot } from 'react-dom/client';

/* local component imports */
import App from './components/global/App';

/* Create root into app entry point */
const tetraMasterApp = document.getElementById('tetra-master-app');
const tetraMasterRoot = createRoot(tetraMasterApp);
tetraMasterRoot.render(<App />);
