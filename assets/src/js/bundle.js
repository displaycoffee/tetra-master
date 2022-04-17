/* react imports */
import { createRoot } from 'react-dom/client';
import { useSearchParams, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

/* local component imports */
import App from './components/global/App';

/* create root into app entry point */
const tetraMasterApp = document.getElementById('tetra-master-app');
const tetraMasterRoot = createRoot(tetraMasterApp);
tetraMasterRoot.render(
	<Router>
		<App />
	</Router>
);
