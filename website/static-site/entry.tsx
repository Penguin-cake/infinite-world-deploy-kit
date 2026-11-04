import {createRoot} from 'react-dom/client';
import '../app/layout';
import Hub from '../app/ui';
import Run from '../app/run/[id]/run';
import {route} from './catalog.mjs';

createRoot(document.getElementById('root')!).render(
  new URLSearchParams(location.search).get('run') === route.id
    ? <Run id={route.id}/>
    : <Hub/>
);
