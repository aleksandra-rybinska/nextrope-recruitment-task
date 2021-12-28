import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const client = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
