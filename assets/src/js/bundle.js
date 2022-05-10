/* react imports */
import { createRoot } from 'react-dom/client';

/* local component imports */
import Index from './components/layout/Index';

/* create root into app entry point */
const tetraMasterApp = document.getElementById('tetra-master-app');
const tetraMasterRoot = createRoot(tetraMasterApp);
tetraMasterRoot.render(<Index />);
