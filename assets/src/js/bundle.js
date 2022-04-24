/* react imports */
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

/* local component imports */
import Index from './components/layout/Index';

/* create root into app entry point */
const tetraMasterApp = document.getElementById('tetra-master-app');
const tetraMasterRoot = createRoot(tetraMasterApp);
tetraMasterRoot.render(
	<Router>
		<Index />
	</Router>
);
