import { createRoot } from 'react-dom/client';

import './components/index.css';
import App from './components/app';

const container = document.getElementById('root');

createRoot(container).render(<App />);
